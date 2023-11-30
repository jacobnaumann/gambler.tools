import React from 'react';
import Card from './Card';
import '../assets/styles/Homepage.css'; // Make sure to create this CSS file

const cardData = [
  { title: 'Sports', link: '/sports' },
  { title: 'Poker', link: '/poker'  },
  { title: 'Racing', link: '/racing'  },
  { title: 'Casino', link: '/casino'  },
];

const Homepage = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Gambler.Tools</h1>
      </div>
      <div className="cards-container">
        {cardData.map((card, index) => (
          <Card key={index} title={card.title} link={card.link} />
        ))}
      </div>
    </div>
   
    
  );
};

export default Homepage;