import React from 'react';

const PlayerInput = ({ numberOfPlayers, onNumberOfPlayersChange, playerChips, onPlayerChipsChange, numberOfPlacesPaid, onNumberOfPlacesPaidChange, payouts, onPayoutsChange }) => {
    const MAX_PLAYERS = 30; // Define the maximum number of players
    const MAX_PLACES_PAID = 30; // Define the maximum number of places paid

    // Handle adding a player
    const handleAddPlayer = () => {
        if (numberOfPlayers < MAX_PLAYERS) {
            onNumberOfPlayersChange(numberOfPlayers + 1);
        }
    };

    // Handle subtracting a player
    const handleSubtractPlayer = () => {
        if (numberOfPlayers > 2) {
            onNumberOfPlayersChange(numberOfPlayers - 1);
        }
    };

    // Handle adding a paid place
    const handleAddPlacePaid = () => {
        if (numberOfPlacesPaid < MAX_PLACES_PAID) {
            onNumberOfPlacesPaidChange(numberOfPlacesPaid + 1);
        }
    };

    // Handle subtracting a paid place
    const handleSubtractPlacePaid = () => {
        if (numberOfPlacesPaid > 1) {
            onNumberOfPlacesPaidChange(numberOfPlacesPaid - 1);
        }
    };

    return (
        <div className="structure-container">
            <div className='players-container'>
                <div className="number-of-players">
                    <label>Players Remaining: </label>
                    <button onClick={handleSubtractPlayer}>-</button>
                    <select value={numberOfPlayers} onChange={(e) => onNumberOfPlayersChange(parseInt(e.target.value, 10))}>
                        {[...Array(MAX_PLAYERS).keys()].map(i => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                    <button onClick={handleAddPlayer}>+</button>
                </div>
                {Array.from({ length: numberOfPlayers }).map((_, index) => (
                    <div key={index} className="player-chips">
                        <label>Player {index + 1} Chips: </label>
                        <input
                            type="number"
                            value={playerChips[index] || 0}
                            onChange={(e) => onPlayerChipsChange(index, parseInt(e.target.value, 10))}
                        />
                    </div>
                ))}
            </div>
            <div className='payouts-container'>
                <div className="places-paid">
                    <label>Places Paid: </label>
                    <button onClick={handleSubtractPlacePaid}>-</button>
                    <select value={numberOfPlacesPaid} onChange={(e) => onNumberOfPlacesPaidChange(parseInt(e.target.value, 10))}>
                        {[...Array(MAX_PLACES_PAID).keys()].map(i => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                    <button onClick={handleAddPlacePaid}>+</button>
                </div>
                {Array.from({ length: numberOfPlacesPaid }).map((_, index) => (
                    <div key={index} className="payout-amount">
                        <label>Place {index + 1} Payout: $</label>
                        <input
                            type="number"
                            value={payouts[index] || 0}
                            onChange={(e) => onPayoutsChange(index, parseFloat(e.target.value))}
                        />
                    </div>
                ))}
            </div>

        </div>
    );
};

export default PlayerInput;
