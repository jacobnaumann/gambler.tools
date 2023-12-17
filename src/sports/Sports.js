import React from 'react';
import '../assets/styles/Sports.css'; // Make sure to create this CSS file
import Card from '../common/card/Card';

const Sports = () => {
    const pokerCardData = [
      { title: 'Parlay Calculator', link: '/sports/parlaycalculator' },
      { title: 'Season-Long Fantasy', link: '/sports/fantasy' },
      { title: 'Daily Fantasy', link: '/sports/dfs'  }
    ];
  
    return (
      <div className="sports-container">
        <h1>Sports Betting Tools</h1>
        <p>Welcome to the Sports Betting section of Gambler.Tools. Here you'll find tools to help you make informed decisions on sports betting.</p>
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

export default Sports;
