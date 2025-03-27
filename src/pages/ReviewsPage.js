import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import { articles } from '../data/articles';

function ReviewsPage() {
  // Filter articles by the "Reviews" category
  const reviewArticles = articles.filter(article => article.category === "Reviews");

  return (
    <div className="container">
      <h1 className="section-title">Game Reviews</h1>
      
      <div className="articles-grid">
        {reviewArticles.length > 0 ? (
          reviewArticles.map(article => (
            <Link to={`/article/${article.id}`} key={article.id} style={{ textDecoration: 'none' }}>
              <ArticleCard article={article} />
            </Link>
          ))
        ) : (
          <p>No review articles available at the moment. Check back soon!</p>
        )}
      </div>
    </div>
  );
}

export default ReviewsPage; 