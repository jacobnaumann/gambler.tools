/* Card.js */

import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Homepage.css'; 

const Card = ({ image, title, link }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />     
    </div>

  );
};

export default Card;
