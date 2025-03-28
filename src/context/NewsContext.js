import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { fetchGamingNews, fetchNewsByCategory, fetchTrendingGamingNews } from '../services/newsService';

// Create context
const NewsContext = createContext();

// Define initial state
const initialState = {
  latestNews: [],
  categoryNews: {},
  trendingNews: [],
  selectedArticle: null,
  loading: false,
  error: null,
  totalArticles: 0,
  currentPage: 1
};

// Reducer function
function newsReducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_LATEST_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        latestNews: action.payload.articles,
        totalArticles: action.payload.totalArticles || 0
      };
    case 'FETCH_CATEGORY_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        categoryNews: { 
          ...state.categoryNews, 
          [action.category]: action.payload.articles 
        } 
      };
    case 'FETCH_TRENDING_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        trendingNews: action.payload.articles
      };
    case 'SET_SELECTED_ARTICLE':
      return { ...state, selectedArticle: action.payload };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// Provider component
export function NewsProvider({ children }) {
  const [state, dispatch] = useReducer(newsReducer, initialState);

  // Load initial data
  useEffect(() => {
    loadLatestNews();
    loadTrendingNews();
  }, []);

  // Load latest gaming news
  const loadLatestNews = async (page = 1) => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const data = await fetchGamingNews(page, 10);
      dispatch({ type: 'FETCH_LATEST_SUCCESS', payload: data });
      dispatch({ type: 'SET_PAGE', payload: page });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

  // Load news by category
  const loadCategoryNews = async (category, page = 1) => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const data = await fetchNewsByCategory(category, page, 10);
      dispatch({ 
        type: 'FETCH_CATEGORY_SUCCESS', 
        category: category,
        payload: data 
      });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

  // Load trending gaming news
  const loadTrendingNews = async () => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const data = await fetchTrendingGamingNews(5);
      dispatch({ type: 'FETCH_TRENDING_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

  // Set selected article for detailed view
  const setSelectedArticle = (article) => {
    dispatch({ type: 'SET_SELECTED_ARTICLE', payload: article });
  };

  // Context values
  const value = {
    ...state,
    loadLatestNews,
    loadCategoryNews,
    loadTrendingNews,
    setSelectedArticle
  };

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
}

// Custom hook to use news context
export function useNews() {
  return useContext(NewsContext);
} 