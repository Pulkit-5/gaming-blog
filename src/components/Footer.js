import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
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
            <li className="footer-link"><Link to="/">Home</Link></li>
            <li className="footer-link"><Link to="/news">News</Link></li>
            <li className="footer-link"><Link to="/reviews">Reviews</Link></li>
            <li className="footer-link"><Link to="/about">About</Link></li>
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

export default Footer; 