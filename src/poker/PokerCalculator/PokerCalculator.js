import React, { useState } from 'react';
import { TexasHoldem } from 'poker-odds-calc';
import CardSelection from './CardSelection';
import CardDisplay from './CardDisplay';
import './PokerCalculator.css';


const PokerCalculator = () => {
    const [playerOneCards, setPlayerOneCards] = useState([null, null]);
    const [playerTwoCards, setPlayerTwoCards] = useState([null, null]);
    const [tableCards, setTableCards] = useState([null, null, null, null]); // Four cards for the flop and turn
    const [selectedCards, setSelectedCards] = useState(new Set());
    const [errorMessage, setErrorMessage] = useState('');
    const [playerOneOdds, setPlayerOneOdds] = useState('');
    const [playerTwoOdds, setPlayerTwoOdds] = useState('');
    const [tieOdds, setTieOdds] = useState('');
    const [showOdds, setShowOdds] = useState(false);



    const handleCardSelect = (card) => {
        if (selectedCards.has(card)) {
            // Determine which set of cards the card belongs to and return it
            const allCards = [playerOneCards, playerTwoCards, tableCards];
            const playerNumber = allCards.findIndex(hand => hand.includes(card));

            // Call handleCardReturn with the card and the determined player number
            // playerNumber will be 0 for playerOneCards, 1 for playerTwoCards, and 2 for tableCards
            handleCardReturn(card, playerNumber);
        } else {
            // Check if all spots are filled
            const allSpotsFilled = playerOneCards.every(c => c !== null) &&
                playerTwoCards.every(c => c !== null) &&
                tableCards.every(c => c !== null);

            if (allSpotsFilled) {
                console.log("All spots are filled. No more cards can be selected.");
                return; // Exit if no spots are available
            }

            setSelectedCards(prevSelectedCards => new Set(prevSelectedCards.add(card)));

            // Assign card to the first empty slot in player one's hand
            setPlayerOneCards(prevCards => {
                const firstNullIndex = prevCards.indexOf(null);
                if (firstNullIndex !== -1) {
                    const newCards = [...prevCards];
                    newCards[firstNullIndex] = card;
                    return newCards;
                }
                return prevCards;
            });

            // If player one's hand is full, assign card to the first empty slot in player two's hand
            setPlayerTwoCards(prevCards => {
                if (playerOneCards.indexOf(null) === -1) {
                    const firstNullIndex = prevCards.indexOf(null);
                    if (firstNullIndex !== -1) {
                        const newCards = [...prevCards];
                        newCards[firstNullIndex] = card;
                        return newCards;
                    }
                }
                return prevCards;
            });

            // If both player's hands are full, assign card to the table
            setTableCards(prevCards => {
                if (playerOneCards.indexOf(null) === -1 && playerTwoCards.indexOf(null) === -1) {
                    const firstNullIndex = prevCards.indexOf(null);
                    if (firstNullIndex !== -1) {
                        const newCards = [...prevCards];
                        newCards[firstNullIndex] = card;
                        return newCards;
                    }
                }
                return prevCards;
            });
        }
    };

    const handleCardReturn = (card) => {
        setSelectedCards(prevSelectedCards => {
            const newSelectedCards = new Set(prevSelectedCards);
            newSelectedCards.delete(card);
            return newSelectedCards;
        });

        // Function to remove a card from any hand
        const removeFromHand = (hand) => hand.map(c => c === card ? null : c);

        setPlayerOneCards(prevCards => removeFromHand(prevCards));
        setPlayerTwoCards(prevCards => removeFromHand(prevCards));
        setTableCards(prevCards => removeFromHand(prevCards));
    };

    const toggleCardSelection = (card) => {
        if (selectedCards.has(card)) {
            handleCardReturn(card);
        } else {
            handleCardSelect(card);
        }
    };

    const resetBoard = () => {
        // Reset all player and table cards to null
        setPlayerOneCards([null, null]);
        setPlayerTwoCards([null, null]);
        setTableCards([null, null, null, null]);

        // Clear the set of selected cards
        setSelectedCards(new Set());
        setShowOdds(false); // Hide odds when reset
    };

    const handleCalculate = () => {
        const filteredPlayerOneCards = playerOneCards.filter(card => card);
        const filteredPlayerTwoCards = playerTwoCards.filter(card => card);
        const filteredTableCards = tableCards.filter(card => card);

        try {
            // Check if both players have exactly two cards
            if (filteredPlayerOneCards.length !== 2 || filteredPlayerTwoCards.length !== 2) {
                throw new Error("Each player must have exactly two cards.");
            }

            // Initialize TexasHoldem Table
            const Table = new TexasHoldem();
            Table.addPlayer(filteredPlayerOneCards)
                .addPlayer(filteredPlayerTwoCards);

            // Check for correct number of table cards
            if (filteredTableCards.length === 1 || filteredTableCards.length === 2) {
                throw new Error("Invalid number of table cards. The flop should have 3 cards.");
            }

            // Setting the board if table cards are available
            if (filteredTableCards.length >= 3) {
                Table.setBoard(filteredTableCards);
            }

            // Perform calculation
            const Result = Table.calculate();
            console.log(`Board - ${Result.getBoard()}`);
            Result.getPlayers().forEach(player => {
                console.log(`${player.getName()} - ${player.getHand()} - Wins: ${player.getWinsPercentageString()} - Ties: ${player.getTiesPercentageString()}`);
                if (player.getName() === "Player #1") {
                    setPlayerOneOdds(player.getWinsPercentageString().replace(/~/g, "")); // Example percentage
                } else if (player.getName() === "Player #2") {
                    setPlayerTwoOdds(player.getWinsPercentageString().replace(/~/g, ""));
                }
                setTieOdds(player.getTiesPercentageString().replace(/~/g, ""));
                setShowOdds(true); // Show odds
            });

        } catch (error) {
            setErrorMessage(error.message);
            console.log(error.message);
        }
    };




    return (
        <div className="poker-container">
            <div className="calculator-container">
                <h1>Poker Hand Equity Calculator</h1>
                <p>Welcome to the Texas Holdem Equity Calculator at Gambler.Tools! Please choose the player cards and the table cards (if needed).</p>
                <div className="deck-section">
                    <CardSelection onCardClick={toggleCardSelection} selectedCards={selectedCards} />
                </div>
                <div className="game-section">
                    <div className="player-section">
                        <div className="player-container">
                            <CardDisplay selectedCards={playerOneCards} playerNumber={1} onCardReturn={handleCardReturn} />
                            <div className="odds-display">{showOdds ? playerOneOdds : ''}</div>
                        </div>
                        <div className="player-container">
                            <CardDisplay selectedCards={playerTwoCards} playerNumber={2} onCardReturn={handleCardReturn} />
                            <div className="odds-display">{showOdds ? playerTwoOdds : ''}</div>
                        </div>
                    </div>
                    <div className="table-section">
                        <CardDisplay selectedCards={tableCards} title="Table Cards" onCardReturn={(card) => handleCardReturn(card, 0)} odds={showOdds ? tieOdds : ''} />
                        <div className="action-buttons">
                            <button onClick={handleCalculate} className="calculate-button">Calculate</button>
                            <button onClick={resetBoard} className="reset-button">Reset</button>
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
    );

};

export default PokerCalculator;
