import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import '../assets/styles/Homepage.css'; // Make sure to create this CSS file
import sportsImage from '../assets/images/card-sports.png';
import pokerImage from '../assets/images/card-poker.png';
import racingImage from '../assets/images/card-racing.png';
import casinoImage from '../assets/images/card-casino.png';

const cardData = [
  { title: 'Sports', image: sportsImage, link: '/sports' },
  { title: 'Poker', image: pokerImage, link: '/poker'  },
  { title: 'Racing', image: racingImage, link: '/racing'  },
  { title: 'Casino', image: casinoImage, link: '/casino'  },
];

const Homepage = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Gambler.Tools</h1>
      </div>
      <div className="cards-container">
        {cardData.map((card, index) => (
          <Card key={index} title={card.title} image={card.image} link={card.link} />
        ))}
      </div>
    </div>
   
    
  );
};

export default Homepage;