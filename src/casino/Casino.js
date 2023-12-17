import React from 'react';
import Card from '../common/card/Card';
import '../assets/styles/Casino.css'; // Make sure to create this CSS file

const Casino = () => {
  const pokerCardData = [
    { title: 'Slots Calculator', link: '/casino/slotscalculator' },
    { title: 'Casino Directory', link: '/casino/directory'  }
  ];

  return (
    <div className="casino-container">
      <h1>Racing Tools</h1>
      <p>Welcome to the Casino section of Gambler.Tools. Here you'll find tools to help you make informed decisions on casino gambling.</p>
      {/* Add more content and components relevant to the Casino section here */}
      <div className="cards-container">
        {pokerCardData.map((card, index) => (
          <Card key={index} title={card.title} link={card.link} />
        ))}
      </div>
      {/* <PokerCalculator /> */}
    </div>
  );
};

export default Casino;

