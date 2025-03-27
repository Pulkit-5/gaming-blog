import React, { useState } from 'react';
import './App.css';

function App() {
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
      default:
        return <LandingPage navigateTo={navigateTo} />;
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
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo" onClick={() => navigateTo('home')} style={{cursor: 'pointer'}}>
          <div className="logo-text">GamePulse</div>
        </div>
        
        <nav className="nav-menu">
          <span className="nav-link" onClick={() => navigateTo('home')} style={{cursor: 'pointer'}}>Home</span>
          <span className="nav-link" onClick={() => navigateTo('news')} style={{cursor: 'pointer'}}>News</span>
          <span className="nav-link" onClick={() => navigateTo('reviews')} style={{cursor: 'pointer'}}>Reviews</span>
          <span className="nav-link" onClick={() => navigateTo('about')} style={{cursor: 'pointer'}}>About</span>
        </nav>
      </div>
    </header>
  );
}

function Footer({ navigateTo }) {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <div className="logo footer-logo">
            <div className="logo-text">GamePulse</div>
          </div>
          <p className="footer-description">
            Your source for the latest gaming news, reviews, and industry insights.
          </p>
          <div className="social-links">
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
        
        <div className="footer-section">
          <h3 className="footer-heading">Explore</h3>
          <ul className="footer-links">
            <li className="footer-link"><span onClick={() => navigateTo('home')} style={{cursor: 'pointer'}}>Home</span></li>
            <li className="footer-link"><span onClick={() => navigateTo('news')} style={{cursor: 'pointer'}}>News</span></li>
            <li className="footer-link"><span onClick={() => navigateTo('reviews')} style={{cursor: 'pointer'}}>Reviews</span></li>
            <li className="footer-link"><span onClick={() => navigateTo('about')} style={{cursor: 'pointer'}}>About</span></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-heading">Categories</h3>
          <ul className="footer-links">
            <li className="footer-link"><a href="#">PC Gaming</a></li>
            <li className="footer-link"><a href="#">Console Gaming</a></li>
            <li className="footer-link"><a href="#">Mobile Gaming</a></li>
            <li className="footer-link"><a href="#">Esports</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-heading">Contact</h3>
          <ul className="footer-links">
            <li className="footer-link"><a href="mailto:info@gamepulse.com">info@gamepulse.com</a></li>
            <li className="footer-link"><a href="#">Advertise with us</a></li>
            <li className="footer-link"><a href="#">Write for us</a></li>
          </ul>
        </div>
      </div>
      
      <div className="copyright">
        <div className="container">
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

function ArticleCard({ article, onClick }) {
  return (
    <div className="article-card" onClick={onClick} style={{cursor: 'pointer'}}>
      <img src={article.image} alt={article.title} className="article-image" />
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
  const featuredArticles = getFeaturedArticles();
  const recentArticles = getRecentArticles();
  
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
      </section>
    </div>
  );
}

function NewsContent({ navigateTo }) {
  const newsArticles = articles.filter(article => article.category === "News");
  
  return (
    <div className="container">
      <h1 className="section-title">Latest Gaming News</h1>
      
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
    </div>
  );
}

function ReviewsContent({ navigateTo }) {
  const reviewArticles = articles.filter(article => article.category === "Reviews");
  
  return (
    <div className="container">
      <h1 className="section-title">Game Reviews</h1>
      
      <div className="articles-grid">
        {reviewArticles.length > 0 ? (
          reviewArticles.map(article => (
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
    </div>
  );
}

function ArticleContent({ articleId, navigateTo }) {
  const article = articles.find(a => a.id === articleId);

  if (!article) {
    return (
      <div className="container">
        <h1>Article Not Found</h1>
        <p>Sorry, the article you're looking for doesn't exist.</p>
        <span onClick={() => navigateTo('home')} className="btn btn-primary" style={{cursor: 'pointer'}}>
          Back to Home
        </span>
      </div>
    );
  }

  return (
    <div className="container">
      <article className="article-full">
        <header className="article-header">
          <span className="article-category">{article.category}</span>
          <h1 className="article-title-large">{article.title}</h1>
          <div className="article-meta">
            <span>By {article.author}</span>
            <span>{article.date}</span>
          </div>
        </header>

        <img 
          src={article.image} 
          alt={article.title} 
          className="article-image-full" 
        />

        <div className="article-content-full">
          <p>{article.content}</p>
        </div>

        <div className="article-navigation">
          <span onClick={() => navigateTo('home')} className="btn btn-secondary" style={{cursor: 'pointer'}}>
            Back to Home
          </span>
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
        <p>
          Welcome to GamePulse, your definitive source for everything gaming. Founded in 2023, our mission is to provide gamers
          with timely, insightful, and engaging content about the world of video games.
        </p>
        
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
        
        <h2>What We Cover</h2>
        <ul>
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
      </div>
    </div>
  );
}

export default App;
