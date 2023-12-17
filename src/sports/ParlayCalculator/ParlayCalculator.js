import React, { useState } from 'react';
import ParlayStructure from './ParlayStructure';
import ParlayLegs from './ParlayLegs';
import Buttons from './Buttons';
import ParlayPayout from './ParlayPayout';
import './ParlayCalculator.css';

const ParlayCalculator = () => {
    // State for the number of legs in the parlay
    const [numLegs, setNumLegs] = useState(2);

    // State for storing odds of each leg
    const [odds, setOdds] = useState(Array(numLegs).fill('-110'));

    // State to track the validity of each leg's odds
    const [oddsValidity, setOddsValidity] = useState(Array(numLegs).fill(true));

    // State for storing the bet amount
    const [betAmount, setBetAmount] = useState(100);

    // State for the calculated payout
    const [payout, setPayout] = useState('');

    // Additional state for the calculated odds
    const [parlayOdds, setParlayOdds] = useState('');

    // Function to update the number of legs and reset odds
    const updateNumLegs = (newNumLegs) => {
        setNumLegs(newNumLegs);

        // Maintain current odds and fill the rest with '-110'
        const updatedOdds = [...odds.slice(0, newNumLegs), ...Array(Math.max(0, newNumLegs - odds.length)).fill('-110')];
        setOdds(updatedOdds);

        // Maintain current odds validity and fill the rest with true
        const updatedOddsValidity = [...oddsValidity.slice(0, newNumLegs), ...Array(Math.max(0, newNumLegs - oddsValidity.length)).fill(true)];
        setOddsValidity(updatedOddsValidity);
    };

    // Function to update odds for a specific leg
    const updateLegOdds = (index, value) => {
        const newOdds = [...odds];
        newOdds[index] = value;
        setOdds(newOdds);
    };

    // Function to validate odds
    const validateOdds = () => {
        const isValid = odds.map(odd => {
            const num = parseInt(odd, 10);
            return !isNaN(num) && num >= -100000 && num <= 100000;
        });
        setOddsValidity(isValid);
        return isValid.every(val => val);
    };

    const calculatePayout = () => {
        let totalOdds = odds.reduce((acc, legOdds) => {
            let decimalOdds;
            // Convert American odds to decimal format
            if (legOdds >= 100) {
                decimalOdds = (legOdds / 100) + 1; // Positive odds
            } else if (legOdds <= -100) {
                decimalOdds = (100 / Math.abs(legOdds)) + 1; // Negative odds
            } else {
                decimalOdds = 1; // In case of invalid odds, treat as no impact
            }
            return acc * decimalOdds;
        }, 1);

        // Calculate total payout (including stake)
        let totalPayout = totalOdds * betAmount;

        // Calculate net win (payout minus initial stake)
        let netWin = totalPayout - betAmount;

        // Calculate and store the parlay odds
        let calculatedOdds = netWin / betAmount;
        setParlayOdds(calculatedOdds.toFixed(2)); // Round to two decimal places

        // Update the payout state
        setPayout(netWin.toFixed(2)); // Round to two decimal places
    };

    // Function to reset the calculator
    const resetCalculator = () => {
        setNumLegs(2);
        setOdds(Array(2).fill('-110'));
        setBetAmount(100);
        setPayout('');
        setParlayOdds(''); // Also reset the parlayOdds state
    };


    return (
        <div className='parlay-calculator-container'>
            <h1>Parlay Calculator</h1>
            <p>Welcome to the Parlay Calculator at Gambler.Tools!</p>

            <ParlayStructure
                numLegs={numLegs}
                updateNumLegs={updateNumLegs}
                betAmount={betAmount}
                setBetAmount={setBetAmount}
            />
            <ParlayLegs
                numLegs={numLegs}
                odds={odds}
                setLegOdds={updateLegOdds}
                oddsValidity={oddsValidity} // Pass the oddsValidity state
            />
            <ParlayPayout
                betAmt={betAmount}
                payout={payout}
                odds={parlayOdds}
            />
            <Buttons
                onCalculate={calculatePayout}
                onReset={resetCalculator}
                validateOdds={validateOdds} // Pass the validateOdds function
                odds={odds}
            />
        </div>
    );
};

export default ParlayCalculator;
