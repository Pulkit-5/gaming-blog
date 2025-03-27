import React from 'react';

function AboutPage() {
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

export default AboutPage; 