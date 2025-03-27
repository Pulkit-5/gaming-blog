import React from 'react';
import { Link } from 'react-router-dom';

function ArticleCard({ article }) {
  return (
    <div className="article-card">
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

export default ArticleCard; 