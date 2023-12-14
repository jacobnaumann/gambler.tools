import React from 'react';
import '../assets/styles/Poker.css'; // Make sure to create this CSS file
import Card from '../common/card/Card';
import '../assets/styles/Homepage.css'; // Make sure to create this CSS file
// import PokerCalculator from './PokerCalculator/PokerCalculator';

const Poker = () => {
  const pokerCardData = [
    { title: 'Equity Calculator', link: '/poker/pokercalculator' },
    { title: 'Ranges', link: '/ranges'  }
  ];

  return (
    <div className="poker-container">
      <h1>Poker Tools</h1>
      <p>Welcome to the Poker section of Gambler.Tools. Here you'll find tools to help you make informed decisions on poker.</p>
      {/* Add more content and components relevant to the Sports section here */}
      <div className="cards-container">
        {pokerCardData.map((card, index) => (
          <Card key={index} title={card.title} link={card.link} />
        ))}
      </div>
      {/* <PokerCalculator /> */}
    </div>
  );
};

export default Poker;
