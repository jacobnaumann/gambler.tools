import React from 'react';

const ParlayLegs = ({ numLegs, odds, setLegOdds, oddsValidity }) => {
    const MIN_ODDS = -2000;
    const MAX_ODDS = 2000;

    // Function to map the slider value to American odds
    const mapSliderValueToOdds = (sliderValue) => {
        if (sliderValue <= -100 || sliderValue >= 100) {
            return sliderValue;
        }
        return sliderValue < 0 ? -101 : 100;
    };

    // Function to map American odds to slider value
    const mapOddsToSliderValue = (oddsValue) => {
        if (oddsValue <= -101 || oddsValue >= 100) {
            return oddsValue;
        }
        return oddsValue < 0 ? -100 : 99;
    };

    const handleInputChange = (index, value) => {
        setLegOdds(index, value);
    };

    const handleSliderChange = (index, sliderValue) => {
        const oddsValue = mapSliderValueToOdds(parseInt(sliderValue, 10));
        setLegOdds(index, oddsValue);
    };

    return (
        <div className='parlay-legs'>
            {Array.from({ length: numLegs }, (_, index) => (
                <div key={index} className='leg'>
                    <div className='leg-number'>Leg {index + 1}</div>
                    <div className='leg-odds'>
                        <input
                            type='text'
                            value={oddsValidity[index] ? odds[index] : ''}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onClick={(e) => e.target.value = ''}
                            className='odds-input'
                        />
                        <input
                            type='range'
                            min={MIN_ODDS}
                            max={MAX_ODDS}
                            value={mapOddsToSliderValue(odds[index] || -110)}
                            onChange={(e) => handleSliderChange(index, e.target.value)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ParlayLegs;
