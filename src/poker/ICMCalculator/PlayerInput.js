import React, { useState } from 'react';
import ChipInputModal from './ChipInputModal';
import PayoutInputModal from './PayoutInputModal'; // Import the new modal

const PlayerInput = ({ numberOfPlayers, onNumberOfPlayersChange, playerChips, onPlayerChipsChange, numberOfPlacesPaid, onNumberOfPlacesPaidChange, payouts, onPayoutsChange }) => {
    const MAX_PLAYERS = 200; // Define the maximum number of players
    const MAX_PLACES_PAID = 200; // Define the maximum number of places paid
    const [isChipModalOpen, setIsChipModalOpen] = useState(false);
    const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);

    // Handle adding a player
    const handleAddPlayer = () => {
        if (numberOfPlayers < MAX_PLAYERS) {
            onNumberOfPlayersChange(numberOfPlayers + 1);
            onPlayerChipsChange([...playerChips, 0]); // Add a new player with 0 chips
        }
    };

    // Handle subtracting a player
    const handleSubtractPlayer = () => {
        if (numberOfPlayers > 2) {
            onNumberOfPlayersChange(numberOfPlayers - 1);
            onPlayerChipsChange(playerChips.slice(0, -1)); // Remove the last player's chips
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

    // Handle paste of chip counts
    const handleChipCountsSubmit = (pastedData) => {
        const chipCounts = pastedData.split('\n')
            .map(line => parseInt(line.replace(/,/g, '').trim(), 10))
            .filter(num => !isNaN(num));

        if (chipCounts.length > 0) {
            onNumberOfPlayersChange(chipCounts.length);
            onPlayerChipsChange(chipCounts);
        }
    };

    // Handle paste of payout values
    const handlePayoutsSubmit = (pastedData) => {
        console.log('Pasted Payout Data:', pastedData); // Debugging: Log the raw pasted data

        const payoutValues = pastedData.split('\n')
            .map(line => {
                const parsedNumber = parseFloat(line.replace(/[$,]/g, '').trim()); // Remove $ and commas
                console.log('Parsed Payout:', parsedNumber); // Debugging: Log each parsed payout
                return parsedNumber;
            })
            .filter(num => !isNaN(num)); // Filter out NaN values

        console.log('Payout Values:', payoutValues); // Debugging: Log the final payout values array

        if (payoutValues.length > 0) {
            onNumberOfPlacesPaidChange(payoutValues.length);
            onPayoutsChange(payoutValues);
        } else {
            console.error('No valid payout values found.'); // Debugging: Log an error if no valid numbers
        }
    };

    // Function to format ordinal numbers (1st, 2nd, 3rd, etc.)
    const formatOrdinalNumber = (number) => {
        const j = number % 10,
            k = number % 100;
        if (j === 1 && k !== 11) {
            return number + "st";
        }
        if (j === 2 && k !== 12) {
            return number + "nd";
        }
        if (j === 3 && k !== 13) {
            return number + "rd";
        }
        return number + "th";
    };

    return (
        <div className="structure-container">
            <div className='players-container'>   
                <div className='info-title'>
                    <h2>Player Chip Information</h2>
                </div>             
                <div className="number-of-players">
                    <label>Players Left: </label>
                    <button onClick={handleSubtractPlayer}>-</button>
                    <select value={numberOfPlayers} onChange={(e) => onNumberOfPlayersChange(parseInt(e.target.value, 10))}>
                        {[...Array(MAX_PLAYERS).keys()].map(i => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                    <button onClick={handleAddPlayer}>+</button>
                    <button onClick={() => setIsChipModalOpen(true)}>Manual Entry</button>
                </div>
                {Array.from({ length: numberOfPlayers }).map((_, index) => (
                    <div key={index} className="player-chips">
                        <label>Player {index + 1} Chips: </label>
                        <input
                            type="number"
                            value={playerChips[index] || 0}
                            onChange={(e) => onPlayerChipsChange(index, parseInt(e.target.value, 10))}
                            onClick={(e) => e.target.value = ''}
                        />
                    </div>
                ))}
            </div>
            <ChipInputModal
                isOpen={isChipModalOpen}
                onClose={() => setIsChipModalOpen(false)}
                onSubmit={handleChipCountsSubmit}
            />
            <div className='payouts-container'>
                <div className='info-title'>
                    <h2>Prize Pool Information</h2>
                </div>
                <div className="places-paid">
                    <label>Places Paid: </label>
                    <button onClick={handleSubtractPlacePaid}>-</button>
                    <select value={numberOfPlacesPaid} onChange={(e) => onNumberOfPlacesPaidChange(parseInt(e.target.value, 10))}>
                        {[...Array(MAX_PLACES_PAID).keys()].map(i => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                    <button onClick={handleAddPlacePaid}>+</button>
                    <button onClick={() => setIsPayoutModalOpen(true)}>Manual Entry</button>
                </div>
                {Array.from({ length: numberOfPlacesPaid }).map((_, index) => (
                    <div key={index} className="payout-amount">
                        <label>{formatOrdinalNumber(index + 1)} Place: $</label>
                        <input
                            type="number"
                            value={payouts[index] || 0}
                            onChange={(e) => onPayoutsChange(index, parseFloat(e.target.value))}
                            onClick={(e) => e.target.value = ''}
                        />
                    </div>
                ))}
            </div>
            <PayoutInputModal
                isOpen={isPayoutModalOpen}
                onClose={() => setIsPayoutModalOpen(false)}
                onSubmit={handlePayoutsSubmit}
            />
        </div>
    );
};

export default PlayerInput;
