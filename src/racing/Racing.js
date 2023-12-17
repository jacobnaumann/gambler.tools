import React from 'react';
import Card from '../common/card/Card';
import '../assets/styles/Racing.css'; // Make sure to create this CSS file

const Racing = () => {
  const pokerCardData = [
    { title: 'Exacta Calculator', link: '/racing/exactacalculator' },
    { title: 'Racing Schedules', link: '/racing/horseracingschedules'  }
  ];

  return (
    <div className="racing-container">
      <h1>Racing Tools</h1>
      <p>Welcome to the Racing section of Gambler.Tools. Here you'll find tools to help you make informed decisions on racing gambling.</p>
      {/* Add more content and components relevant to the Racing section here */}
      <div className="cards-container">
        {pokerCardData.map((card, index) => (
          <Card key={index} title={card.title} link={card.link} />
        ))}
      </div>
      {/* <PokerCalculator /> */}
    </div>
  );
};

export default Racing;
