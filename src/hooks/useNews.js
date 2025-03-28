import { useState, useEffect } from 'react';
import { 
  fetchGamingNews, 
  fetchNewsByCategory, 
  fetchTrendingGamingNews,
  searchGamingArticles
} from '../services/newsService';

export function useNews() {
  const [latestNews, setLatestNews] = useState([]);
  const [categoryNews, setCategoryNews] = useState({});
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [apiCallCount, setApiCallCount] = useState(0);

  // Increment API call counter
  const trackApiCall = () => {
    setApiCallCount(prev => prev + 1);
    
    // Check if we're getting close to the limit
    if (apiCallCount > 90) {
      console.warn("Approaching GNews API call limit (100/day). Using cache extensively.");
    }
  };

  // Load initial data - only once
  useEffect(() => {
    // Only load if we haven't already
    if (latestNews.length === 0) {
      loadLatestNews();
    }
    
    if (trendingNews.length === 0) {
      loadTrendingNews();
    }
  }, []);

  // Load latest gaming news
  const loadLatestNews = async (page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      trackApiCall();
      const data = await fetchGamingNews(page, 10);
      
      if (page === 1) {
        setLatestNews(data.articles || []);
      } else {
        setLatestNews(prev => [...prev, ...(data.articles || [])]);
      }
      
      setTotalArticles(data.totalArticles || 0);
      setCurrentPage(page);
    } catch (err) {
      console.error("Error in loadLatestNews:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load news by category
  const loadCategoryNews = async (category, page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      trackApiCall();
      const data = await fetchNewsByCategory(category, page, 10);
      
      if (page === 1) {
        setCategoryNews(prev => ({
          ...prev,
          [category]: data.articles || []
        }));
      } else {
        setCategoryNews(prev => ({
          ...prev,
          [category]: [...(prev[category] || []), ...(data.articles || [])]
        }));
      }
    } catch (err) {
      console.error(`Error in loadCategoryNews for ${category}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load trending gaming news
  const loadTrendingNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchTrendingGamingNews(5);
      setTrendingNews(data.articles || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    latestNews,
    categoryNews,
    trendingNews,
    loading,
    error,
    currentPage,
    totalArticles,
    loadLatestNews,
    loadCategoryNews,
    loadTrendingNews,
    apiCallCount
  };
} 