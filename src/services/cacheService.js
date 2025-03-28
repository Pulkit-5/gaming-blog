// Simple in-memory cache for API responses
const CACHE_EXPIRY = 15 * 60 * 1000; // 15 minutes in milliseconds

class CacheService {
  constructor() {
    this.cache = {};
  }

  // Get from cache
  get(key) {
    const item = this.cache[key];
    
    if (!item) return null;
    
    // Check if item has expired
    if (Date.now() > item.expiry) {
      delete this.cache[key];
      return null;
    }
    
    return item.value;
  }

  // Set in cache with expiry
  set(key, value, ttl = CACHE_EXPIRY) {
    const expiry = Date.now() + ttl;
    this.cache[key] = { value, expiry };
  }

  // Clear all cache
  clear() {
    this.cache = {};
  }

  // Clear specific item
  clearItem(key) {
    delete this.cache[key];
  }
}

export const cacheService = new CacheService(); 