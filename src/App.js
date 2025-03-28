import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import { useAuth } from './context/AuthContext';
import { useBookmarks } from './hooks/useBookmarks';
import { useNews } from './hooks/useNews';
import { searchGamingArticles } from './services/newsService';

function App() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  // Navigation handler
  const navigateTo = (page, articleId = null) => {
    setCurrentPage(page);
    if (articleId) {
      setSelectedArticleId(articleId);
    }
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  };

  // Render content based on current page
  const renderContent = () => {
    switch(currentPage) {
      case 'landing':
        return <LandingPage navigateTo={navigateTo} />;
      case 'home':
        return (
          <>
            <Header navigateTo={navigateTo} />
            <main className="main-content">
              <HomeContent navigateTo={navigateTo} />
            </main>
            <Footer navigateTo={navigateTo} />
          </>
        );
      case 'news':
        return (
          <>
            <Header navigateTo={navigateTo} />
            <main className="main-content">
              <NewsContent navigateTo={navigateTo} />
            </main>
            <Footer navigateTo={navigateTo} />
          </>
        );
      case 'reviews':
        return (
          <>
            <Header navigateTo={navigateTo} />
            <main className="main-content">
              <ReviewsContent navigateTo={navigateTo} />
            </main>
            <Footer navigateTo={navigateTo} />
          </>
        );
      case 'about':
        return (
          <>
            <Header navigateTo={navigateTo} />
            <main className="main-content">
              <AboutContent />
            </main>
            <Footer navigateTo={navigateTo} />
          </>
        );
      case 'article':
        return (
          <>
            <Header navigateTo={navigateTo} />
            <main className="main-content">
              <ArticleContent articleId={selectedArticleId} navigateTo={navigateTo} />
            </main>
            <Footer navigateTo={navigateTo} />
          </>
        );
      case 'login':
        return (
          <>
            <Header navigateTo={navigateTo} />
            <main className="main-content">
              <LoginContent navigateTo={navigateTo} />
            </main>
            <Footer navigateTo={navigateTo} />
          </>
        );
      case 'profile':
        return (
          <>
            <Header navigateTo={navigateTo} />
            <main className="main-content">
              <ProfileContent navigateTo={navigateTo} />
            </main>
            <Footer navigateTo={navigateTo} />
          </>
        );
      case 'bookmarks':
        return (
          <>
            <Header navigateTo={navigateTo} />
            <main className="main-content">
              <BookmarksContent navigateTo={navigateTo} />
            </main>
            <Footer navigateTo={navigateTo} />
          </>
        );
      case 'search':
        return (
          <>
            <Header navigateTo={navigateTo} />
            <main className="main-content">
              <SearchContent query={selectedArticleId} navigateTo={navigateTo} />
            </main>
            <Footer navigateTo={navigateTo} />
          </>
        );
      case 'news-category':
        return (
          <>
            <Header navigateTo={navigateTo} />
            <main className="main-content">
              <CategoryNewsContent category={selectedArticleId} navigateTo={navigateTo} />
            </main>
            <Footer navigateTo={navigateTo} />
          </>
        );
      default:
        return (
          <>
            <Header navigateTo={navigateTo} />
            <main className="main-content">
              <HomeContent navigateTo={navigateTo} />
            </main>
            <Footer navigateTo={navigateTo} />
          </>
        );
    }
  };

  return (
    <div className="app">
      {renderContent()}
    </div>
  );
}

// Landing Page Component
function LandingPage({ navigateTo }) {
  return (
    <div className="landing-page">
      <div className="landing-overlay"></div>
      <div className="landing-content">
        <div className="landing-logo">
          <h1>GamePulse</h1>
        </div>
        <h2>Your Pulse on the Gaming World</h2>
        <p>Breaking news, reviews, and insights from the world of interactive entertainment</p>
        <button 
          className="landing-cta-button"
          onClick={() => navigateTo('home')}
        >
          Enter Site <i className="fas fa-arrow-right"></i>
        </button>
        
        <div className="landing-features">
          <div className="landing-feature">
            <i className="fas fa-newspaper"></i>
            <h3>Latest News</h3>
            <p>Stay updated with breaking news from the gaming industry</p>
          </div>
          <div className="landing-feature">
            <i className="fas fa-star"></i>
            <h3>Game Reviews</h3>
            <p>In-depth analysis of the newest game releases</p>
          </div>
          <div className="landing-feature">
            <i className="fas fa-trophy"></i>
            <h3>Esports Coverage</h3>
            <p>Follow competitive gaming events and player updates</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// All components defined in the same file for simplicity
function Header({ navigateTo }) {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
  // Add a reference to detect outside clicks for the dropdown
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };
  
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery('');
    }
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('search', searchQuery.trim());
      setShowSearch(false);
    }
  };
  
  return (
    <header className="main-header">
      <div className="container">
        <div className="header-inner">
          <div className="logo" onClick={() => navigateTo('home')}>
            GamePulse
          </div>
          
          <nav className="main-nav">
            <ul>
              <li onClick={() => navigateTo('home')}>Home</li>
              <li onClick={() => navigateTo('news')}>News</li>
              <li onClick={() => navigateTo('reviews')}>Reviews</li>
              <li onClick={() => navigateTo('about')}>About</li>
            </ul>
          </nav>
          
          <div className="header-actions">
            <button 
              className="search-toggle" 
              onClick={toggleSearch}
              aria-label={showSearch ? "Close search" : "Open search"}
            >
              <i className={`fas ${showSearch ? 'fa-times' : 'fa-search'}`}></i>
            </button>
            
            {user ? (
              <div className="user-profile" ref={dropdownRef}>
                <div className="profile-info" onClick={toggleDropdown}>
                  <img 
                    src={user.photoURL || 'https://placehold.co/100x100?text=User'} 
                    alt={user.displayName || 'User'} 
                    className="user-avatar"
                  />
                  <span className="user-name">{user.displayName}</span>
                </div>
                
                {showDropdown && (
                  <div className="profile-dropdown">
                    <div className="dropdown-arrow"></div>
                    <ul>
                      <li onClick={() => {
                        navigateTo('profile');
                        setShowDropdown(false);
                      }}>
                        <i className="fas fa-user"></i> Profile
                      </li>
                      <li onClick={() => {
                        navigateTo('bookmarks');
                        setShowDropdown(false);
                      }}>
                        <i className="fas fa-bookmark"></i> Bookmarks
                      </li>
                      <li onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button 
                className="login-button" 
                onClick={() => navigateTo('login')}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
        
        {/* Search bar - expanded when showSearch is true */}
        <div className={`search-bar ${showSearch ? 'active' : ''}`}>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search for gaming news, reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={showSearch}
            />
            <button type="submit" aria-label="Search">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

function Footer({ navigateTo }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo" onClick={() => navigateTo('home')}>
            GamePulse
          </div>
          <nav className="footer-nav">
            <ul>
              <li onClick={() => navigateTo('home')}>Home</li>
              <li onClick={() => navigateTo('news')}>News</li>
              <li onClick={() => navigateTo('reviews')}>Reviews</li>
              <li onClick={() => navigateTo('about')}>About</li>
            </ul>
          </nav>
          <div className="footer-social">
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GamePulse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Sample data for articles
const articles = [
  {
    id: 1,
    title: "Starfield Breaks Records with 10 Million Players in First Week",
    excerpt: "Bethesda's highly anticipated space RPG is off to a stellar start with incredible player numbers.",
    content: "Bethesda's latest release has shattered expectations with over 10 million players exploring the cosmos in the first week of release. The game, which has been in development for over a decade, represents the studio's first new IP in 25 years...",
    image: "https://placehold.co/600x400?text=Starfield",
    category: "News",
    author: "Alex Johnson",
    date: "Sept 15, 2023",
    featured: true
  },
  {
    id: 2,
    title: "Review: The Latest PS5 Pro - Worth the Upgrade?",
    excerpt: "We take an in-depth look at Sony's mid-generation console refresh and whether it deserves your hard-earned cash.",
    content: "The PS5 Pro represents Sony's attempt to extend the lifecycle of the current console generation with improved hardware specifications. Featuring enhanced ray-tracing capabilities and improved frame rates across the board...",
    image: "https://placehold.co/600x400?text=PS5+Pro",
    category: "Reviews",
    author: "Samantha Lee",
    date: "Sept 12, 2023",
    featured: true
  },
  {
    id: 3,
    title: "Upcoming Indie Games You Shouldn't Miss This Fall",
    excerpt: "From puzzle platformers to narrative adventures, these indie titles are poised to make a big impact.",
    content: "While AAA releases tend to dominate the headlines, the indie scene continues to deliver some of the most innovative and creative experiences in gaming. This fall's lineup is particularly impressive...",
    image: "https://placehold.co/600x400?text=Indie+Games",
    category: "Features",
    author: "Marcus Green",
    date: "Sept 10, 2023",
    featured: true
  },
  {
    id: 4,
    title: "E-Sports Tournament Breaks Viewership Records",
    excerpt: "The International Dota 2 Championship sees unprecedented global audience numbers.",
    content: "The competitive gaming scene continues to grow as this year's International tournament for Dota 2 broke all previous viewership records. With over 5 million concurrent viewers at its peak...",
    image: "https://placehold.co/600x400?text=Esports",
    category: "Esports",
    author: "Leila Wang",
    date: "Sept 8, 2023"
  },
  {
    id: 5,
    title: "Next-Gen Graphics Cards Announced: What You Need to Know",
    excerpt: "Industry giants reveal their newest GPU architectures promising significant performance leaps.",
    content: "The next generation of PC gaming is about to get a serious boost with the announcement of new graphics card lineups from industry leaders. Initial benchmarks suggest performance improvements of up to 70% compared to current generation cards...",
    image: "https://placehold.co/600x400?text=Graphics+Cards",
    category: "Hardware",
    author: "Ryan Chen",
    date: "Sept 5, 2023"
  },
  {
    id: 6,
    title: "Classic RPG Series Getting Modern Remake",
    excerpt: "Beloved fantasy RPG franchise from the early 2000s set for a complete overhaul with modern graphics and gameplay.",
    content: "Fans of classic RPGs have reason to celebrate as developer StudioName has announced a complete remake of the beloved fantasy series that defined the early 2000s gaming landscape. Using the latest Unreal Engine technology...",
    image: "https://placehold.co/600x400?text=RPG+Remake",
    category: "News",
    author: "Diana Rodriguez",
    date: "Sept 3, 2023"
  }
];

// Helper functions
const getFeaturedArticles = () => articles.filter(article => article.featured);
const getRecentArticles = (count = 3) => [...articles].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, count);

function ArticleCard({ article, onClick, isBookmarked: propIsBookmarked }) {
  const { user } = useAuth();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const [imageError, setImageError] = useState(false);
  
  // Check bookmark status, prioritizing prop if provided
  const bookmarkStatus = propIsBookmarked !== undefined 
    ? propIsBookmarked 
    : (user && isBookmarked(article.id));
  
  const handleBookmarkClick = (e) => {
    e.stopPropagation(); // Prevent triggering the article click
    
    if (!user) {
      // Show a notification that user needs to login
      alert('Please sign in to bookmark articles');
      return;
    }
    
    if (bookmarkStatus) {
      removeBookmark(article.id);
    } else {
      addBookmark(article);
    }
  };
  
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="article-card" onClick={onClick}>
      {user && (
        <button 
          className={`bookmark-button ${bookmarkStatus ? 'active' : ''}`} 
          onClick={handleBookmarkClick}
          aria-label={bookmarkStatus ? 'Remove bookmark' : 'Add bookmark'}
        >
          <i className={`fas ${bookmarkStatus ? 'fa-bookmark' : 'fa-bookmark'}`}></i>
        </button>
      )}
      <img 
        src={imageError ? 'https://placehold.co/600x400?text=Gaming+News' : article.image} 
        alt={article.title} 
        className="article-image"
        onError={handleImageError} 
      />
      <div className="article-content">
        <span className="article-category">{article.category}</span>
        <h2 className="article-title">{article.title}</h2>
        <p className="article-excerpt">{article.excerpt}</p>
        <div className="article-meta">
          <span>{article.author}</span>
          <span>{article.date}</span>
        </div>
      </div>
    </div>
  );
}

function HomeContent({ navigateTo }) {
  const { latestNews, trendingNews, loading, error } = useNews();
  const [fallbackUsed, setFallbackUsed] = useState(false);
  
  // Fallback data in case API fails
  const fallbackArticles = [
    {
      id: "fallback1",
      title: "The Evolution of Gaming: From Arcades to Virtual Reality",
      excerpt: "Explore how gaming has transformed over the decades, from coin-operated machines to immersive VR experiences.",
      content: "Gaming has come a long way since the days of Pong and Space Invaders. This article explores the fascinating journey...",
      image: "https://placehold.co/600x400?text=Gaming+Evolution",
      category: "Featured",
      author: "GamePulse Team",
      date: new Date().toLocaleDateString(),
      url: "#"
    },
    {
      id: "fallback2",
      title: "Top 10 Most Anticipated Games of the Year",
      excerpt: "A roundup of the most exciting game releases gamers can't wait to get their hands on.",
      content: "The gaming industry never sleeps, and there's always something exciting on the horizon...",
      image: "https://placehold.co/600x400?text=Anticipated+Games",
      category: "Featured",
      author: "GamePulse Team",
      date: new Date().toLocaleDateString(),
      url: "#"
    },
    {
      id: "fallback3",
      title: "How Indie Developers Are Changing the Gaming Landscape",
      excerpt: "Small studios are making a big impact with innovative gameplay and storytelling.",
      content: "In an industry dominated by AAA titles, indie developers continue to push boundaries...",
      image: "https://placehold.co/600x400?text=Indie+Games",
      category: "Featured",
      author: "GamePulse Team",
      date: new Date().toLocaleDateString(),
      url: "#"
    }
  ];
  
  // Format trending news for featured display
  const featuredArticles = trendingNews.length > 0 
    ? trendingNews.map(article => ({
        id: btoa(article.url), // Use base64 encoded URL as ID
        title: article.title,
        excerpt: article.description || "Read more about this trending gaming story...",
        content: article.content,
        image: article.image || 'https://placehold.co/600x400?text=Gaming+News',
        category: 'Featured',
        author: article.source?.name || 'GamePulse',
        date: new Date(article.publishedAt).toLocaleDateString(),
        url: article.url
      }))
    : fallbackArticles;
  
  // Format latest news
  const recentArticles = latestNews.length > 0 
    ? latestNews.slice(0, 3).map(article => ({
        id: btoa(article.url),
        title: article.title,
        excerpt: article.description || "Click to read more about this gaming news...",
        content: article.content,
        image: article.image || 'https://placehold.co/600x400?text=Gaming+News',
        category: 'News',
        author: article.source?.name || 'GamePulse',
        date: new Date(article.publishedAt).toLocaleDateString(),
        url: article.url
      }))
    : fallbackArticles;
  
  // If there's an error but we haven't used fallback data yet
  useEffect(() => {
    if (error && !fallbackUsed) {
      setFallbackUsed(true);
      console.log("Using fallback data due to API error:", error);
    }
  }, [error, fallbackUsed]);

  if (loading && featuredArticles.length === 0 && recentArticles.length === 0) {
    return (
      <div className="container">
        <div className="loading-spinner">Loading the latest gaming news...</div>
      </div>
    );
  }

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Your Pulse on the Gaming World</h1>
          <p>
            Stay updated with the latest gaming news, reviews, and industry insights.
          </p>
          <span onClick={() => navigateTo('news')} className="btn btn-primary" style={{cursor: 'pointer'}}>
            Explore Latest News
          </span>
        </div>
      </section>
      
      {error && !fallbackUsed && (
        <div className="container">
          <div className="error-message">
            <p>There was an error loading the latest gaming news: {error}</p>
            <p>Using locally cached content for now. Check back later!</p>
          </div>
        </div>
      )}
      
      <section className="container">
        <h2 className="section-title">Featured Articles</h2>
        <div className="articles-grid">
          {featuredArticles.map(article => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onClick={() => navigateTo('article', article.id)} 
            />
          ))}
        </div>
      </section>
      
      <section className="container">
        <h2 className="section-title">Latest News</h2>
        <div className="articles-grid">
          {recentArticles.map(article => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onClick={() => navigateTo('article', article.id)} 
            />
          ))}
        </div>
        <div className="view-more">
          <button 
            className="btn btn-secondary" 
            onClick={() => navigateTo('news')}
          >
            View All News
          </button>
        </div>
      </section>
    </div>
  );
}

function NewsContent({ navigateTo }) {
  const { latestNews, loading, error, loadLatestNews, currentPage, totalArticles } = useNews();
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Format news articles
  const newsArticles = latestNews.map(article => ({
    id: btoa(article.url || Math.random().toString()),
    title: article.title,
    excerpt: article.description || "Click to read more...",
    content: article.content || "Content not available",
    image: article.image || 'https://placehold.co/600x400?text=Gaming+News',
    category: article.source?.name || 'News',
    author: article.source?.name || 'Unknown',
    date: article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
    url: article.url || "#"
  }));
  
  // For loading more news
  const loadMore = () => {
    const nextPage = currentPage + 1;
    loadLatestNews(nextPage);
  };
  
  // Check if there are more pages to load
  const hasMorePages = newsArticles.length < totalArticles;
  
  // Handle category selection
  const handleCategoryClick = (category) => {
    if (category === 'all') {
      setActiveCategory('all');
    } else {
      setActiveCategory(category);
      navigateTo('news-category', category);
    }
  };
  
  if (loading && newsArticles.length === 0) {
    return (
      <div className="container">
        <div className="loading-spinner">Loading gaming news...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="section-title">Latest Gaming News</h1>
      
      <div className="news-categories">
        <span 
          className={`news-category ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('all')}
        >
          All
        </span>
        <span 
          className={`news-category ${activeCategory === 'industry' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('industry')}
        >
          Industry
        </span>
        <span 
          className={`news-category ${activeCategory === 'esports' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('esports')}
        >
          Esports
        </span>
        <span 
          className={`news-category ${activeCategory === 'reviews' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('reviews')}
        >
          Reviews
        </span>
        <span 
          className={`news-category ${activeCategory === 'technology' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('technology')}
        >
          Technology
        </span>
        <span 
          className={`news-category ${activeCategory === 'console' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('console')}
        >
          Console
        </span>
      </div>
      
      {error && (
        <div className="error-banner">
          <p>Note: Using locally cached content due to connectivity issues. Some content may not be up-to-date.</p>
        </div>
      )}
      
      <div className="articles-grid">
        {newsArticles.length > 0 ? (
          newsArticles.map(article => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onClick={() => navigateTo('article', article.id)} 
            />
          ))
        ) : (
          <p>No news articles available at the moment. Check back soon!</p>
        )}
      </div>
      
      {newsArticles.length > 0 && hasMorePages && (
        <div className="load-more">
          <button 
            className="btn btn-secondary" 
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More News'}
          </button>
        </div>
      )}
    </div>
  );
}

function ReviewsContent({ navigateTo }) {
  const { categoryNews, loading, error, loadCategoryNews } = useNews();
  const [page, setPage] = useState(1);
  
  // Load reviews on first render
  useEffect(() => {
    if (!categoryNews['reviews'] || categoryNews['reviews'].length === 0) {
      loadCategoryNews('reviews');
    }
  }, []);
  
  // Fallback reviews in case API fails
  const fallbackReviews = [
    {
      id: "review1",
      title: "The Legend of Zelda: Tears of the Kingdom - Our Verdict",
      excerpt: "Nintendo's latest masterpiece takes the open-world formula to new heights with incredible creativity tools.",
      content: "The Legend of Zelda: Tears of the Kingdom builds upon the foundation of Breath of the Wild with innovative new mechanics...",
      image: "https://placehold.co/600x400?text=Zelda+Review",
      category: "Reviews",
      author: "GamePulse Reviews",
      date: new Date().toLocaleDateString(),
      url: "#review1"
    },
    {
      id: "review2",
      title: "Baldur's Gate 3 Review: A New Standard for RPGs",
      excerpt: "Larian Studios delivers a role-playing experience that honors both the Dungeons & Dragons source material and player freedom.",
      content: "Five years in development and a lengthy early access period have resulted in one of the most impressive RPGs of the decade...",
      image: "https://placehold.co/600x400?text=BG3+Review",
      category: "Reviews",
      author: "GamePulse Reviews",
      date: new Date().toLocaleDateString(),
      url: "#review2"
    },
    {
      id: "review3",
      title: "Starfield Review: Bethesda's Cosmic Adventure",
      excerpt: "The long-awaited space RPG offers a vast universe to explore, but does it reach the stars?",
      content: "As Bethesda's first new IP in 25 years, Starfield carries a lot of expectations. Set in a future where humanity has colonized parts of the galaxy...",
      image: "https://placehold.co/600x400?text=Starfield+Review",
      category: "Reviews",
      author: "GamePulse Reviews",
      date: new Date().toLocaleDateString(),
      url: "#review3"
    }
  ];
  
  // Get reviews from API or use fallback
  const reviewsFromAPI = categoryNews['reviews'] || [];
  
  // Format reviews
  const formattedReviews = reviewsFromAPI.length > 0 
    ? reviewsFromAPI.map(article => ({
        id: btoa(article.url || Math.random().toString()),
        title: article.title,
        excerpt: article.description || "Read our review...",
        content: article.content || "Full review content not available",
        image: article.image || 'https://placehold.co/600x400?text=Game+Review',
        category: 'Reviews',
        author: article.source?.name || 'GamePulse Reviews',
        date: article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
        url: article.url || "#"
      }))
    : fallbackReviews;
    
  // Load more reviews
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadCategoryNews('reviews', nextPage);
  };
  
  if (loading && formattedReviews.length === 0) {
    return <div className="container"><div className="loading-spinner">Loading game reviews...</div></div>;
  }

  return (
    <div className="container">
      <h1 className="section-title">Game Reviews</h1>
      
      {error && (
        <div className="error-banner">
          <p>Note: Using locally cached content due to connectivity issues. Some content may not be up-to-date.</p>
        </div>
      )}
      
      <div className="articles-grid">
        {formattedReviews.length > 0 ? (
          formattedReviews.map(article => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onClick={() => navigateTo('article', article.id)} 
            />
          ))
        ) : (
          <p>No review articles available at the moment. Check back soon!</p>
        )}
      </div>
      
      {reviewsFromAPI.length > 0 && (
        <div className="load-more">
          <button 
            className="btn btn-secondary" 
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More Reviews'}
          </button>
        </div>
      )}
    </div>
  );
}

function ArticleContent({ articleId, navigateTo }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { latestNews, trendingNews, categoryNews } = useNews();
  const { user } = useAuth();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  
  // Helper function to find article by ID in a collection
  const findArticleById = useCallback((collection) => {
    if (!collection || !Array.isArray(collection)) return null;
    return collection.find(item => btoa(item.url) === articleId);
  }, [articleId]);
  
  useEffect(() => {
    if (!articleId) {
      setLoading(false);
      return;
    }
    
    // Fallback articles in case API content is not available
    const fallbackArticles = [
      {
        id: "fallback1",
        title: "The Evolution of Gaming: From Arcades to Virtual Reality",
        excerpt: "Explore how gaming has transformed over the decades, from coin-operated machines to immersive VR experiences.",
        content: "Gaming has come a long way since the days of Pong and Space Invaders. This article explores the fascinating journey...",
        image: "https://placehold.co/600x400?text=Gaming+Evolution",
        category: "Featured",
        author: "GamePulse Team",
        date: new Date().toLocaleDateString(),
        url: "#"
      },
      // ... other fallback articles ...
    ];
    
    // Search in all news sources
    let foundArticle = findArticleById(latestNews);
    
    if (!foundArticle) {
      foundArticle = findArticleById(trendingNews);
    }
    
    if (!foundArticle) {
      // Search in category news
      for (const category in categoryNews) {
        if (categoryNews[category]) {
          foundArticle = findArticleById(categoryNews[category]);
          if (foundArticle) break;
        }
      }
    }
    
    // If article is still not found and ID matches a fallback article
    if (!foundArticle && ["fallback1", "fallback2", "fallback3"].includes(articleId)) {
      foundArticle = fallbackArticles.find(a => a.id === articleId);
    }
    
    if (foundArticle) {
      // Format article for display
      setArticle({
        id: foundArticle.id || btoa(foundArticle.url || ""),
        title: foundArticle.title,
        excerpt: foundArticle.description || foundArticle.excerpt || "",
        content: foundArticle.content || "Content not available. Please check back later.",
        image: foundArticle.image || 'https://placehold.co/1200x600?text=Gaming+News',
        category: foundArticle.category || (foundArticle.source && foundArticle.source.name) || "News",
        author: (foundArticle.source && foundArticle.source.name) || foundArticle.author || "GamePulse",
        date: foundArticle.publishedAt ? new Date(foundArticle.publishedAt).toLocaleDateString() : foundArticle.date,
        url: foundArticle.url || "#",
        source: (foundArticle.source && foundArticle.source.name) || foundArticle.source || "GamePulse"
      });
    }
    
    setLoading(false);
  }, [articleId, latestNews, trendingNews, categoryNews, findArticleById]);
  
  if (loading) {
    return <div className="container"><div className="loading-spinner">Loading article...</div></div>;
  }

  if (!article) {
    return (
      <div className="container">
        <h1>Article Not Found</h1>
        <p>Sorry, the article you're looking for doesn't exist or has been removed.</p>
        <button className="btn btn-primary" onClick={() => navigateTo('home')}>
          Back to Home
        </button>
      </div>
    );
  }
  
  const bookmarkStatus = isBookmarked(article.id);
  
  const handleBookmarkClick = () => {
    if (!user) {
      alert('Please sign in to bookmark articles');
      return;
    }
    
    if (bookmarkStatus) {
      removeBookmark(article.id);
    } else {
      addBookmark(article);
    }
  };

  return (
    <div className="container">
      <article className="article-full">
        <header className="article-header">
          <div className="article-actions">
            <span className="article-category">{article.category}</span>
            {user && (
              <button 
                className={`bookmark-button-large ${bookmarkStatus ? 'active' : ''}`}
                onClick={handleBookmarkClick}
              >
                <i className={`fas ${bookmarkStatus ? 'fa-bookmark' : 'fa-bookmark'}`}></i>
                <span>{bookmarkStatus ? 'Bookmarked' : 'Bookmark'}</span>
              </button>
            )}
          </div>
          <h1 className="article-title-large">{article.title}</h1>
          <div className="article-meta">
            <span>Source: {article.source}</span>
            <span>{article.date}</span>
          </div>
        </header>

        {article.image && (
          <img 
            src={article.image} 
            alt={article.title} 
            className="article-image-full"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = 'https://placehold.co/1200x600?text=Gaming+News';
              e.target.classList.add('error');
            }} 
          />
        )}

        <div className="article-content-full">
          <p>{article.content}</p>
          <div className="article-source">
            <p>This article has been sourced from {article.source}.</p>
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
            >
              Read Full Article
            </a>
          </div>
        </div>

        <div className="article-navigation">
          <button className="btn btn-secondary" onClick={() => navigateTo('home')}>
            Back to Home
          </button>
        </div>
      </article>
    </div>
  );
}

function AboutContent() {
  return (
    <div className="container">
      <h1 className="section-title">About GamePulse</h1>
      
      <div className="about-content">
        <p className="about-intro">
          Welcome to GamePulse, your definitive source for everything gaming. Founded in 2023, our mission is to provide gamers
          with timely, insightful, and engaging content about the world of video games.
        </p>
        
        <div className="about-image">
          <img src="https://placehold.co/1200x400?text=GamePulse+Team" alt="GamePulse Team" />
        </div>
        
        <h2>Our Mission</h2>
        <p>
          At GamePulse, we believe that gaming is more than just a hobby—it's a culture, a community, and an art form.
          Our goal is to celebrate games in all their forms, from indie gems to AAA blockbusters, and to provide our readers
          with comprehensive coverage of the gaming industry.
        </p>
        
        <h2>Our Team</h2>
        <p>
          Our team consists of passionate gamers and industry experts who live and breathe video games. With diverse backgrounds
          and gaming preferences, we bring a wide range of perspectives to our coverage.
        </p>
        
        <div className="team-grid">
          <div className="team-member">
            <img src="https://placehold.co/200x200?text=A" alt="Team Member" />
            <h3>Alex Johnson</h3>
            <p>Editor-in-Chief</p>
          </div>
          <div className="team-member">
            <img src="https://placehold.co/200x200?text=S" alt="Team Member" />
            <h3>Samantha Lee</h3>
            <p>Senior Editor</p>
          </div>
          <div className="team-member">
            <img src="https://placehold.co/200x200?text=M" alt="Team Member" />
            <h3>Marcus Green</h3>
            <p>Features Writer</p>
          </div>
        </div>
        
        <h2>What We Cover</h2>
        <ul className="about-list">
          <li>Breaking news from the gaming industry</li>
          <li>In-depth game reviews and analyses</li>
          <li>Hardware and tech reviews</li>
          <li>Esports coverage and tournament updates</li>
          <li>Developer interviews and behind-the-scenes features</li>
          <li>Gaming culture and community stories</li>
        </ul>
        
        <h2>Contact Us</h2>
        <p>
          Have a tip, suggestion, or just want to say hello? We'd love to hear from you! 
          Reach out to us at <a href="mailto:info@gamepulse.com">info@gamepulse.com</a>.
        </p>
        
        <div className="about-social">
          <a href="#" className="social-link">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="social-link">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="social-link">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="social-link">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

function ProfileContent({ navigateTo }) {
  const { user, logout } = useAuth();
  const { bookmarks } = useBookmarks();
  
  if (!user) {
    return (
      <div className="container">
        <h1 className="section-title">Profile</h1>
        <div className="auth-message">
          <p>You need to be logged in to view your profile.</p>
          <button className="btn btn-primary" onClick={() => navigateTo('login')}>
            Sign In
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container">
      <div className="profile-content">
        <div className="profile-header">
          <img 
            src={user.photoURL || 'https://placehold.co/200x200?text=User'} 
            alt={user.displayName} 
            className="profile-avatar" 
          />
          <div className="profile-info">
            <h2>{user.displayName}</h2>
            <p>{user.email}</p>
            <p>Member since {new Date(user.metadata.creationTime).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="profile-actions">
          <button className="btn btn-primary" onClick={() => navigateTo('bookmarks')}>
            <i className="fas fa-bookmark"></i> My Bookmarks
          </button>
          <button className="btn btn-danger" onClick={logout}>
            <i className="fas fa-sign-out-alt"></i> Sign Out
          </button>
        </div>
        
        <div className="profile-section">
          <h3>Your Bookmarks</h3>
          {bookmarks.length > 0 ? (
            <div className="profile-bookmarks">
              {bookmarks.slice(0, 3).map(article => (
                <div 
                  key={article.id} 
                  className="profile-bookmark-item"
                  onClick={() => navigateTo('article', article.id)}
                >
                  <img src={article.image} alt={article.title} />
                  <div>
                    <h4>{article.title}</h4>
                    <p>{article.date}</p>
                  </div>
                </div>
              ))}
              {bookmarks.length > 3 && (
                <button 
                  className="btn btn-link" 
                  onClick={() => navigateTo('bookmarks')}
                >
                  View all {bookmarks.length} bookmarks
                </button>
              )}
            </div>
          ) : (
            <p>You haven't bookmarked any articles yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function BookmarksContent({ navigateTo }) {
  const { bookmarks } = useBookmarks();
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="container">
        <h1 className="section-title">Bookmarks</h1>
        <div className="auth-message">
          <p>You need to be logged in to view your bookmarks.</p>
          <button className="btn btn-primary" onClick={() => navigateTo('home')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container">
      <h1 className="section-title">My Bookmarks</h1>
      
      <div className="articles-grid">
        {bookmarks.length > 0 ? (
          bookmarks.map(article => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onClick={() => navigateTo('article', article.id)} 
              isBookmarked={true}
            />
          ))
        ) : (
          <div className="no-results">
            <p>You haven't bookmarked any articles yet.</p>
            <p>Browse articles and click the bookmark icon to save them for later.</p>
            <button className="btn btn-primary" onClick={() => navigateTo('news')}>
              Browse News
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchContent({ query, navigateTo }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    
    const fetchResults = async () => {
      if (!query) return;
      
      setLoading(true);
      try {
        const data = await searchGamingArticles(query);
        
        if (isMounted) {
          setSearchResults(data.articles || []);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error searching:", err);
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };
    
    fetchResults();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [query]); // Only dependency is query
  
  // Format search results - Add a check to avoid mapping over undefined
  const formattedResults = searchResults && searchResults.length > 0 
    ? searchResults.map(article => ({
        id: btoa((article.url || '') + Math.random().toString()),
        title: article.title || 'No Title',
        excerpt: article.description || "Click to read more...",
        content: article.content || "Content not available",
        image: article.image || 'https://placehold.co/600x400?text=Gaming+News',
        category: 'Search Result',
        author: article.source?.name || 'Unknown Source',
        date: article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
        url: article.url || "#"
      }))
    : [];
  
  if (loading) {
    return <div className="container"><div className="loading-spinner">Searching for "{query}"...</div></div>;
  }
  
  if (error) {
    return (
      <div className="container">
        <div className="error-message">
          <p>There was an error performing your search: {error}</p>
          <p>Please try again later or check your search terms.</p>
          <button className="btn btn-primary" onClick={() => navigateTo('home')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="section-title">Search Results for "{query}"</h1>
      
      <div className="articles-grid">
        {formattedResults.length > 0 ? (
          formattedResults.map(article => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onClick={() => navigateTo('article', article.id)} 
            />
          ))
        ) : (
          <div className="no-results">
            <p>No results found for "{query}".</p>
            <p>Try different keywords or browse our categories.</p>
            <div className="no-results-actions">
              <button className="btn btn-primary" onClick={() => navigateTo('news')}>
                Browse All News
              </button>
              <button className="btn btn-secondary" onClick={() => navigateTo('home')}>
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryNewsContent({ category, navigateTo }) {
  const { categoryNews, loading, error, loadCategoryNews } = useNews();
  const [page, setPage] = useState(1);
  
  // Load category news on first render
  useEffect(() => {
    if (!categoryNews[category] || categoryNews[category].length === 0) {
      loadCategoryNews(category);
    }
  }, [category, categoryNews, loadCategoryNews]);
  
  // Get news for this category
  const newsForCategory = categoryNews[category] || [];
  
  // Format category news articles
  const categoryArticles = newsForCategory.map(article => ({
    id: btoa(article.url || Math.random().toString()),
    title: article.title,
    excerpt: article.description || "Click to read more...",
    content: article.content || "Content not available",
    image: article.image || 'https://placehold.co/600x400?text=Gaming+News',
    category: getCategoryName(category),
    author: article.source?.name || 'Unknown',
    date: article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
    url: article.url || "#"
  }));
  
  // For loading more news
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadCategoryNews(category, nextPage);
  };
  
  // Get a user-friendly category name
  function getCategoryName(categoryKey) {
    const names = {
      'industry': 'Gaming Industry',
      'esports': 'Esports & Tournaments',
      'reviews': 'Game Reviews',
      'technology': 'Gaming Technology',
      'mobile': 'Mobile Gaming',
      'console': 'Console Gaming'
    };
    return names[categoryKey] || categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
  }
  
  if (loading && categoryArticles.length === 0) {
    return <div className="container"><div className="loading-spinner">Loading {getCategoryName(category)} news...</div></div>;
  }
  
  return (
    <div className="container">
      <h1 className="section-title">{getCategoryName(category)}</h1>
      
      <div className="news-categories">
        <span className="news-category" onClick={() => navigateTo('news')}>All</span>
        <span className={`news-category ${category === 'industry' ? 'active' : ''}`} onClick={() => navigateTo('news-category', 'industry')}>Industry</span>
        <span className={`news-category ${category === 'esports' ? 'active' : ''}`} onClick={() => navigateTo('news-category', 'esports')}>Esports</span>
        <span className={`news-category ${category === 'reviews' ? 'active' : ''}`} onClick={() => navigateTo('news-category', 'reviews')}>Reviews</span>
        <span className={`news-category ${category === 'technology' ? 'active' : ''}`} onClick={() => navigateTo('news-category', 'technology')}>Technology</span>
        <span className={`news-category ${category === 'console' ? 'active' : ''}`} onClick={() => navigateTo('news-category', 'console')}>Console</span>
      </div>
      
      {error && (
        <div className="error-banner">
          <p>Note: Using locally cached content due to connectivity issues. Some content may not be up-to-date.</p>
        </div>
      )}
      
      <div className="articles-grid">
        {categoryArticles.length > 0 ? (
          categoryArticles.map(article => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onClick={() => navigateTo('article', article.id)} 
            />
          ))
        ) : (
          <p>No {getCategoryName(category)} news articles available at the moment. Check back soon!</p>
        )}
      </div>
      
      {categoryArticles.length > 0 && (
        <div className="load-more">
          <button 
            className="btn btn-secondary" 
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : `Load More ${getCategoryName(category)}`}
          </button>
        </div>
      )}
    </div>
  );
}

function LoginContent({ navigateTo }) {
  const { signInWithGoogle } = useAuth();
  
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigateTo('home');
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };
  
  return (
    <div className="container">
      <div className="login-container">
        <h1 className="section-title">Sign In</h1>
        <div className="login-card">
          <p>Sign in to bookmark articles, leave comments, and more.</p>
          <button className="btn-google" onClick={handleGoogleSignIn}>
            <i className="fab fa-google"></i> Sign in with Google
          </button>
          <div className="login-divider">
            <span>Or continue as guest</span>
          </div>
          <button className="btn-secondary" onClick={() => navigateTo('home')}>
            Continue without signing in
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
