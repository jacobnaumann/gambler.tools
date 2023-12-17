import React, { useState } from 'react';
import PlayerInput from './PlayerInput';
import PayoutStructure from './PayoutStructure';
import ICMResults from './ICMResults';
import ICMButtons from './ICMButtons';
import './ICMCalculator.css';

const ICMCalculator = () => {
    const [numberOfPlayers, setNumberOfPlayers] = useState(9);
    const [playerChips, setPlayerChips] = useState([]);
    const [numberOfPlacesPaid, setNumberOfPlacesPaid] = useState(9); // New state for number of places paid
    const [payouts, setPayouts] = useState([]);
    const [icmResults, setIcmResults] = useState([]);

    const handleNumberOfPlayersChange = (num) => {
        setNumberOfPlayers(num);
        setPlayerChips(new Array(num).fill(0));
    };

    const handlePlayerChipsChange = (index, chips) => {
        const newPlayerChips = [...playerChips];
        newPlayerChips[index] = chips;
        setPlayerChips(newPlayerChips);
    };

    const handlePayoutsChange = (index, payout) => {
        const newPayouts = payouts.length >= numberOfPlacesPaid
            ? [...payouts]
            : new Array(numberOfPlacesPaid).fill(0);
        newPayouts[index] = payout;
        setPayouts(newPayouts);
    };

    const handleNumberOfPlacesPaidChange = (num) => {
        setNumberOfPlacesPaid(num);
        setPayouts(new Array(num).fill(0)); // Reset payouts when number of places paid changes
    };

    const calculateICM = () => {
        const icmResults = calculateICMResults(playerChips, payouts);
        setIcmResults(icmResults);
    };

    const resetCalculator = () => {
        setNumberOfPlayers(9);
        setPlayerChips([]);
        setPayouts([]);
        setIcmResults([]);
        setNumberOfPlacesPaid(9);
    };

    return (
        <div className="icm-calculator-container">
            <h1>ICM Calculator</h1>
            <p>Welcome to the ICM Calculator at Gambler.Tools!</p>
            <PlayerInput
                numberOfPlayers={numberOfPlayers}
                onNumberOfPlayersChange={handleNumberOfPlayersChange}
                playerChips={playerChips}
                onPlayerChipsChange={handlePlayerChipsChange}
                numberOfPlacesPaid={numberOfPlacesPaid} // Pass the new props
                onNumberOfPlacesPaidChange={handleNumberOfPlacesPaidChange}
                payouts={payouts}
                onPayoutsChange={handlePayoutsChange}
            />
            {icmResults.length > 0 && <ICMResults results={icmResults} />}
            <ICMButtons
                onCalculate={calculateICM}
                onReset={resetCalculator}
            />
            
        </div>
    );
};

export default ICMCalculator;


function calculateICMResults(playerChips, prizes) {
    const numPlayers = playerChips.length;
    const totalChips = playerChips.reduce((acc, val) => acc + val, 0);
    const normalizedChips = playerChips.map(chips => chips / (totalChips / numPlayers));
    
    const numSimulations = 2000000; // Number of simulations
    let prizeDistributions = Array(numPlayers).fill(0);

    for (let sim = 0; sim < numSimulations; sim++) {
        let places = normalizedChips.map(q => Math.pow(Math.random(), 1.0 / q));
        let sortedIndices = places.map((val, idx) => idx)
                                  .sort((a, b) => places[b] - places[a]);
        
        sortedIndices.forEach((playerIdx, rank) => {
            prizeDistributions[playerIdx] += prizes[rank] || 0;
        });
    }

    return prizeDistributions.map(totalPrize => totalPrize / numSimulations);
}