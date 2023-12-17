/* PlayerHandDisplay.js */

import React from 'react';

const PlayerHandDisplay = ({ selectedCards, playerNumber, onCardReturn, title, odds }) => {
    const cardPlaceholder = '/poker-cards/blank_card.png';
    const displayTitle = title || `Player ${playerNumber}'s Hand`;

    return (
        <div className={`${title ? 'table' : 'hand'}-display`}>
            <h3>{displayTitle}</h3>
            <div className="cards-row">
                {selectedCards.map((card, index) => (
                    <div key={index} className="poker-card" onClick={() => card && onCardReturn(card, playerNumber)}>
                        <img src={card ? `/poker-cards/${card}.png` : cardPlaceholder} alt={card || 'Card placeholder'} />
                    </div>
                ))}
            </div>
            {odds && <div className="tie-odds">{`Tie ${odds}`}</div>}
        </div>
    );
};

export default PlayerHandDisplay;
