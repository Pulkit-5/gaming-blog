import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const { user } = useAuth();
  
  // Load bookmarks from localStorage when user changes
  useEffect(() => {
    if (user) {
      const userBookmarks = localStorage.getItem(`bookmarks_${user.uid}`);
      if (userBookmarks) {
        setBookmarks(JSON.parse(userBookmarks));
      }
    } else {
      setBookmarks([]);
    }
  }, [user]);
  
  // Save bookmarks to localStorage
  const saveBookmarks = (newBookmarks) => {
    setBookmarks(newBookmarks);
    if (user) {
      localStorage.setItem(`bookmarks_${user.uid}`, JSON.stringify(newBookmarks));
    }
  };
  
  // Add bookmark
  const addBookmark = (article) => {
    if (!user) return false;
    
    // Check if article is already bookmarked
    const isBookmarked = bookmarks.some(bookmark => bookmark.id === article.id);
    
    if (!isBookmarked) {
      const newBookmarks = [...bookmarks, article];
      saveBookmarks(newBookmarks);
      return true;
    }
    
    return false;
  };
  
  // Remove bookmark
  const removeBookmark = (articleId) => {
    if (!user) return false;
    
    const newBookmarks = bookmarks.filter(bookmark => bookmark.id !== articleId);
    saveBookmarks(newBookmarks);
    return true;
  };
  
  // Check if article is bookmarked
  const isBookmarked = (articleId) => {
    return bookmarks.some(bookmark => bookmark.id === articleId);
  };
  
  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked
  };
} 