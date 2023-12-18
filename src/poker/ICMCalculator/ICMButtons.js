import React from 'react';

const Buttons = ({ onCalculate, onReset }) => {
    return (
        <div className="icm-calculate-reset-buttons">
            <button onClick={onCalculate} className='icm-calculate-button'>
                Calculate ICM
            </button>
            <button onClick={onReset} className='icm-reset-button'>
                Reset
            </button>
        </div>
    );
};

export default Buttons;
