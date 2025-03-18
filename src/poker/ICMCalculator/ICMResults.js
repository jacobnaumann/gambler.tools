import React from 'react';
import LoadingIndicator from './LoadingIndicator'; // Ensure this is correctly imported

const ICMResults = ({ results, isLoading, playerChips, payouts }) => {
    const formatCurrency = (amount) => {
        return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const copyToClipboard = () => {
        // Create data columns for Excel paste
        let clipboardData = '';
        
        // Loop through each player
        for (let i = 0; i < playerChips.length; i++) {
            // Create a column for each player with their data in the requested order:
            // 1. Chips, 2. Player name, 3. ICM payout, 4. Tournament payout
            const chipCount = playerChips[i];
            const playerNumber = `Player ${i + 1}`;
            const icmPayout = formatCurrency(results[i]);
            const tournamentPayout = i < payouts.length ? formatCurrency(payouts[i]) : "0.00";
            
            // Append player data as a column in the requested order
            clipboardData += `${chipCount}\t${playerNumber}\t${icmPayout}\t${tournamentPayout}\n`;
        }
        
        // Copy to clipboard
        navigator.clipboard.writeText(clipboardData)
            .then(() => {
                alert('Results copied to clipboard! Ready to paste into Excel.');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy to clipboard. Please try again.');
            });
    };

    return (
        <div className="icm-results">
            <div className='icm-payout-header'>
                <h2>Payouts:</h2>
                {results.length > 0 && !isLoading && (
                    <button 
                        onClick={copyToClipboard} 
                        className="copy-button" 
                        title="Copy to clipboard"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                        </svg>
                    </button>
                )}
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
