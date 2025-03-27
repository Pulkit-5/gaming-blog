import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import { featuredArticles, recentArticles } from '../data/articles';

function HomePage() {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Your Pulse on the Gaming World</h1>
          <p>
            Stay updated with the latest gaming news, reviews, and industry insights.
          </p>
          <Link to="/news" className="btn btn-primary">
            Explore Latest News
          </Link>
        </div>
      </section>
      
      <section className="container">
        <h2 className="section-title">Featured Articles</h2>
        <div className="articles-grid">
          {featuredArticles.map(article => (
            <Link to={`/article/${article.id}`} key={article.id}>
              <ArticleCard article={article} />
            </Link>
          ))}
        </div>
      </section>
      
      <section className="container">
        <h2 className="section-title">Latest News</h2>
        <div className="articles-grid">
          {recentArticles.map(article => (
            <Link to={`/article/${article.id}`} key={article.id}>
              <ArticleCard article={article} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage; 