import React from 'react';
import LoadingIndicator from './LoadingIndicator'; // Ensure this is correctly imported

const ICMResults = ({ results, isLoading }) => {
    const formatCurrency = (amount) => {
        return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <div className="icm-results">
            <div className='icm-payout-header'>
                <h2>Payouts:</h2>
            </div>
            <div className='icm-payout'>
                {isLoading ? (
                    <LoadingIndicator />
                ) : (
                    results.map((result, index) => (
                        <div key={index} className="payout-line">
                            <span className="player-label">Player {index + 1}:</span>
                            <span className="payout-amount">${formatCurrency(result)}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ICMResults;
