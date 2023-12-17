/* CardSelector.js */

import React from 'react';

const CardSelection = ({ onCardClick, selectedCards }) => {
    const cards = {
        clubs: ["2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "Tc", "Jc", "Qc", "Kc", "Ac"],
        diamonds: ["2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "Td", "Jd", "Qd", "Kd", "Ad"],
        hearts: ["2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "Th", "Jh", "Qh", "Kh", "Ah"],
        spades: ["2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "Ts", "Js", "Qs", "Ks", "As"]
    };

    return (
        <div className="card-selection">
            {Object.entries(cards).map(([suit, cardsInSuit]) => (
                <div key={suit} className={`suit-row ${suit}`}>
                    {cardsInSuit.map(card => (
                        <div key={card} onClick={() => onCardClick(card)} className={`poker-card ${selectedCards.has(card) ? 'selected' : ''}`}>
                            <img src={`/poker-cards/${card}.png`} alt={card} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};


export default CardSelection;
