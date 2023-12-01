/* Card.js */

import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css'; 

const Card = ({ title, link }) => {
  return (
    <Link to={link} className="card">
      <div className="card-content">
        <div className="card-top">
          <h2 className="card-title">{title}</h2>
        </div>
        <div className="card-bottom">
          <p className="card-text">This is the text for the {title.toLowerCase()} section of the website.</p>
        </div>
        
      </div>
    </Link>
  );
};

export default Card;

