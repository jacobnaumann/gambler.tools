import React from 'react';

const Buttons = ({ onCalculate, onReset, odds }) => {
    const isValidOdds = () => {
        return odds.every(odd => {
            const num = parseInt(odd, 10);
            return !isNaN(num) && num >= -100000 && num <= 100000;
        });
    };

    const handleCalculateClick = () => {
        if (isValidOdds()) {
            onCalculate();
        } else {
            alert('Please enter valid odds for all legs.');
        }
    };

    return (
        <div className='parlay-calculate-reset-buttons'>
            <button onClick={handleCalculateClick} className='parlay-calculate-button'>
                Calculate
            </button>
            <button onClick={onReset} className='parlay-reset-button'>
                Reset
            </button>
        </div>
    );
};

export default Buttons;
