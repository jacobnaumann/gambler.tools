import React from 'react';

const PayoutStructure = ({ payouts, onPayoutsChange }) => {
    const handlePayoutChange = (index, value) => {
        const newPayouts = [...payouts];
        newPayouts[index] = value;
        onPayoutsChange(newPayouts);
    };

    return (
        <div className="payout-structure">
            {payouts.map((payout, index) => (
                <div key={index} className="payout">
                    <label>Place {index + 1} Payout: $</label>
                    <input 
                        type="number" 
                        value={payout} 
                        onChange={(e) => handlePayoutChange(index, parseInt(e.target.value, 10))} 
                    />
                </div>
            ))}
            <button onClick={() => onPayoutsChange([...payouts, 0])}>Add Payout</button>
        </div>
    );
};

export default PayoutStructure;
