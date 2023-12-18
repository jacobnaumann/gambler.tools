import React from 'react';

const ICMResults = ({ results }) => {
    // Function to format the result as currency with commas
    const formatCurrency = (amount) => {
        return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <div className="icm-results">
            <div className='icm-payout-header'>
                <h2>Payouts:</h2>
            </div>
            <div className='icm-payout'>
                {results.map((result, index) => (
                    <div key={index} className="payout-line">
                        <span className="player-label">Player {index + 1}:</span>
                        <span className="payout-amount">${formatCurrency(result)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ICMResults;
