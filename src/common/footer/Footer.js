import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Common.css';

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-column">
          <h3>Pages</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/sports">Sports</Link></li>
            <li><Link to="/poker">Poker</Link></li>
            <li><Link to="/racing">Racing</Link></li>
            <li><Link to="/casino">Casino</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>More</h3>
          <ul>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="https://twitter.com">Twitter</Link></li>
            {/* Add more links as needed */}
          </ul>
        </div>
      </footer>
    );
  };
  
  export default Footer;