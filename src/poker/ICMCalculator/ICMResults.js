import React from 'react';

const ICMResults = ({ results }) => {
    return (
        <div className="icm-results">
            {results.map((result, index) => (
                <p key={index}>Player {index + 1}: ${result.toFixed(2)}</p>
            ))}
        </div>
    );
};

export default ICMResults;
