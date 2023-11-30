/* Card.js */

import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Homepage.css'; // Make sure to create this CSS file

const Card = ({ title, image, link }) => {
  return (
    <Link to={link} className="card-link">
      <div className="card">
        <img src={image} alt={title} className="card-image" />
      </div>
    </Link>
  );
};

export default Card;
