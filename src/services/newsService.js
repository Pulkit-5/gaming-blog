// API key and base URL
const API_KEY = '66758452c4e4941782bec387651a4a0d';
const BASE_URL = 'https://gnews.io/api/v4';

// Simple in-memory cache
const cache = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Helper function to check and get from cache
const getFromCache = (key) => {
  const item = cache[key];
  if (!item) return null;
  
  if (Date.now() > item.expiry) {
    delete cache[key];
    return null;
  }
  
  return item.data;
};

// Helper function to save to cache
const saveToCache = (key, data) => {
  const expiry = Date.now() + CACHE_DURATION;
  cache[key] = { data, expiry };
};

// Function to fetch gaming news
export const fetchGamingNews = async (page = 1, pageSize = 10) => {
  const cacheKey = `gaming_news_${page}_${pageSize}`;
  const cachedData = getFromCache(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }
  
  try {
    // Make the query simpler to avoid potential query syntax errors
    const response = await fetch(
      `${BASE_URL}/search?q=gaming&lang=en&max=${pageSize}&page=${page}&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      // Log more detailed error information
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      throw new Error(`API returned status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if the API returned an error
    if (data.errors) {
      console.error('API returned errors:', data.errors);
      throw new Error(data.errors[0] || 'API returned an error');
    }
    
    saveToCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching gaming news:', error);
    throw error;
  }
};

// Function to fetch news by gaming category
export const fetchNewsByCategory = async (category, page = 1, pageSize = 10) => {
  // Map our categories to search terms
  const searchTerms = {
    'industry': 'gaming industry OR game development OR game developers',
    'esports': 'esports OR competitive gaming OR gaming tournament',
    'reviews': 'game review OR gaming review OR new game release',
    'technology': 'gaming technology OR gaming hardware OR RTX OR GPU',
    'mobile': 'mobile gaming OR mobile games OR smartphone games',
    'console': 'playstation OR xbox OR nintendo OR console gaming'
  };

  const searchTerm = searchTerms[category] || 'gaming';
  const cacheKey = `${category}_news_${page}_${pageSize}`;
  const cachedData = getFromCache(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }
  
  try {
    const response = await fetch(
      `${BASE_URL}/search?q=${searchTerm}&lang=en&max=${pageSize}&page=${page}&sortby=publishedAt&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    saveToCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching ${category} news:`, error);
    throw error;
  }
};

// Function to fetch trending gaming news
export const fetchTrendingGamingNews = async (pageSize = 5) => {
  const cacheKey = `trending_news_${pageSize}`;
  const cachedData = getFromCache(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }
  
  try {
    // For trending news, we use relevance sorting
    const response = await fetch(
      `${BASE_URL}/search?q=gaming OR "video games"&in=title&sortby=relevance&lang=en&max=${pageSize}&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    saveToCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching trending news:', error);
    throw error;
  }
};

// Function to search gaming articles
export const searchGamingArticles = async (query, page = 1, pageSize = 10) => {
  const cacheKey = `search_${query}_${page}_${pageSize}`;
  const cachedData = getFromCache(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }
  
  try {
    const response = await fetch(
      `${BASE_URL}/search?q=${query} AND (gaming OR games)&lang=en&max=${pageSize}&page=${page}&sortby=relevance&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    saveToCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error searching gaming articles:', error);
    throw error;
  }
}; 