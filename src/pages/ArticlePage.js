import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleById } from '../data/articles';

function ArticlePage() {
  const { id } = useParams();
  const article = getArticleById(parseInt(id));

  if (!article) {
    return (
      <div className="container">
        <h1>Article Not Found</h1>
        <p>Sorry, the article you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
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
          {/* In a real app, you would render rich content here */}
        </div>

        <div className="article-navigation">
          <Link to="/" className="btn btn-secondary">Back to Home</Link>
        </div>
      </article>
    </div>
  );
}

export default ArticlePage; 