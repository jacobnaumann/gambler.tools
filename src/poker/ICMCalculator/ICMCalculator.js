import React, { useState } from 'react';
import PlayerInput from './PlayerInput';
import ICMResults from './ICMResults';
import ICMButtons from './ICMButtons';
import './ICMCalculator.css';

const ICMCalculator = () => {
    const [numberOfPlayers, setNumberOfPlayers] = useState(6);
    const [playerChips, setPlayerChips] = useState([]);
    const [numberOfPlacesPaid, setNumberOfPlacesPaid] = useState(6); // New state for number of places paid
    const [payouts, setPayouts] = useState([]);
    const [icmResults, setIcmResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // New state variable for loading status

    const handleNumberOfPlayersChange = (num) => {
        setNumberOfPlayers(num);
        setPlayerChips(new Array(num).fill(0));
        if (num < numberOfPlacesPaid) {
            setNumberOfPlacesPaid(num); // Ensure places paid does not exceed number of players
        }
    };

    const handlePlayerChipsChange = (indexOrArray, value) => {
        // If the first parameter is an array, replace the entire playerChips array
        if (Array.isArray(indexOrArray)) {
            setPlayerChips(indexOrArray);
        } 
        // Otherwise, update the chip count for the specific player
        else {
            const updatedChips = [...playerChips];
            updatedChips[indexOrArray] = value;
            setPlayerChips(updatedChips);
        }
    };

    const handlePayoutsChange = (indexOrArray, value) => {
        // If the first parameter is an array, replace the entire payouts array
        if (Array.isArray(indexOrArray)) {
            setPayouts(indexOrArray);
        } 
        // Otherwise, update the payout amount for the specific place
        else {
            const updatedPayouts = [...payouts];
            updatedPayouts[indexOrArray] = value;
            setPayouts(updatedPayouts);
        }
    };

    // Validation function for player chips
    const validatePlayerChips = () => {
        for (let i = 0; i < playerChips.length; i++) {
            if (typeof playerChips[i] !== 'number' || playerChips[i] <= 0) {
                return { isValid: false, message: `Invalid chip count for Player ${i + 1}` };
            }
        }
        return { isValid: true };
    };

    // Validation function for payout amounts
    const validatePayouts = () => {
        for (let i = 0; i < payouts.length; i++) {
            if (typeof payouts[i] !== 'number' || payouts[i] <= 0) {
                return { isValid: false, message: `Invalid payout amount for Place ${i + 1}` };
            }
        }
        return { isValid: true };
    };

    const calculateICM = () => {
        const playerChipsValidation = validatePlayerChips();
        const payoutsValidation = validatePayouts();

        if (!playerChipsValidation.isValid) {
            alert(playerChipsValidation.message);
            return;
        }

        if (!payoutsValidation.isValid) {
            alert(payoutsValidation.message);
            return;
        }
        setIsLoading(true); // Set loading to true when calculation starts
        setTimeout(() => {
            const icmResults = calculateICMResults(playerChips, payouts);
            setIcmResults(icmResults);
            setIsLoading(false); // Set loading to false when calculation ends
        }, 0); // Execute calculations asynchronously
    };

    const resetCalculator = () => {
        setNumberOfPlayers(6);
        setPlayerChips([]);
        setPayouts([]);
        setIcmResults([]);
        setNumberOfPlacesPaid(6);
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
                numberOfPlacesPaid={numberOfPlacesPaid}
                onNumberOfPlacesPaidChange={setNumberOfPlacesPaid}
                payouts={payouts}
                onPayoutsChange={handlePayoutsChange}
            />
            <ICMResults 
                results={icmResults} 
                isLoading={isLoading} 
                playerChips={playerChips} 
                payouts={payouts} 
            />
            <ICMButtons
                onCalculate={calculateICM}
                onReset={resetCalculator}
            />
        </div>
    );
};

export default ICMCalculator;


const calculateICMResults = (playerChips, prizes) => {
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