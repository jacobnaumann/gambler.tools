import React from 'react';

const ParlayPayout = ({ payout, odds, betAmt }) => {
    return (
        <div className='parlay-payout'>
            <div className='payout-header'>
                <h2>Payout:</h2>
                {payout && <p>${payout}</p>}
            </div>
            <div className='payout-info'>
                {betAmt > 0 && (payout || odds) && <p>Wager: ${betAmt}</p>}
                {odds && <p>Odds: {odds}-1</p>}
            </div>
        </div>
    );
};

export default ParlayPayout;
