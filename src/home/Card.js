/* Card.js */

import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Homepage.css'; // Make sure to create this CSS file

const Card = ({ title, link }) => {
  return (
    <Link to={link} className="card">
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-text">This is the text for the {title.toLowerCase()} section of the website.</p>
      </div>
    </Link>
  );
};

export default Card;

