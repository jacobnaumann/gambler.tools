import React from 'react';

const Buttons = ({ onCalculate, onReset }) => {
    return (
        <div className="icm-calculate-reset-buttons">
            <button onClick={onCalculate} className='calculate-button'>
                Calculate ICM
            </button>
            <button onClick={onReset} className='reset-button'>
                Reset
            </button>
        </div>
    );
};

export default Buttons;
