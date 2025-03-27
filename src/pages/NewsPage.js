import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import { articles } from '../data/articles';

function NewsPage() {
  // Filter articles by the "News" category
  const newsArticles = articles.filter(article => article.category === "News");

  return (
    <div className="container">
      <h1 className="section-title">Latest Gaming News</h1>
      
      <div className="articles-grid">
        {newsArticles.length > 0 ? (
          newsArticles.map(article => (
            <Link to={`/article/${article.id}`} key={article.id} style={{ textDecoration: 'none' }}>
              <ArticleCard article={article} />
            </Link>
          ))
        ) : (
          <p>No news articles available at the moment. Check back soon!</p>
        )}
      </div>
    </div>
  );
}

export default NewsPage; 