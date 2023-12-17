import React from 'react';

const ParlayStructure = ({ numLegs, updateNumLegs, betAmount, setBetAmount }) => {
    const MAX_LEGS = 15; // Define the maximum number of legs

    // Handle adding a leg
    const handleAddLeg = () => {
        if (numLegs < MAX_LEGS) {
            updateNumLegs(numLegs + 1);
        }
    };

    // Handle subtracting a leg
    const handleSubtractLeg = () => {
        if (numLegs > 2) {
            updateNumLegs(numLegs - 1);
        }
    };

    // Handle changing the number of legs from the dropdown
    const handleSelectChange = (e) => {
        updateNumLegs(parseInt(e.target.value, 10));
    };

    // Handle changing the bet amount
    const handleBetAmountChange = (e) => {
        setBetAmount(e.target.value);
    };

    return (
        <div className='parlay-structure'>
            <div className='wager-line'>
                <div className='bet-amount'>
                    <label>Total Wager: $</label>
                    <input
                        value={betAmount}
                        onChange={handleBetAmountChange}
                        onClick={(e) => e.target.value = ''}
                    />
                </div>
            </div>
            <div className='leg-adjust-line'>
                <div className='leg-adjust'>
                    <label>Number of legs: </label>
                    <button onClick={handleSubtractLeg}>-</button>
                    <select value={numLegs} onChange={handleSelectChange}>
                        {/* Modified mapping to start from 2 */}
                        {[...Array(MAX_LEGS - 1).keys()].map(i => (
                            <option key={i + 2} value={i + 2}>{i + 2}</option>
                        ))}
                    </select>
                    <button onClick={handleAddLeg}>+</button>
                </div>
            </div>
        </div>
    );
};

export default ParlayStructure;
