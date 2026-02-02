import React, { useState } from 'react';
import Frame from './Frame';
import Column from './Column';

const ROD_COUNT = 13;

const Abacus = () => {
    const [values, setValues] = useState(Array(ROD_COUNT).fill(0));

    const handleColumnChange = (index, newVal) => {
        const newValues = [...values];
        newValues[index] = newVal;
        setValues(newValues);
    };

    const resetCalls = () => {
        setValues(Array(ROD_COUNT).fill(0));
    };

    // Helper to format number with commas
    // const totalValue = parseInt(values.join(''), 10);

    return (
        <div className="abacus-container">
            <div className="header-text">GSA Educational Council</div>

            {/* <div className="display-value">
                {totalValue.toLocaleString()}
            </div> */}

            {/* Row of values above the frame */}
            <div className="values-row">
                {values.map((val, idx) => (
                    <div key={idx} className="rod-value">
                        {val}
                    </div>
                ))}
            </div>

            <Frame>
                {values.map((val, idx) => (
                    <Column
                        key={idx}
                        value={val}
                        onChange={(v) => handleColumnChange(idx, v)}
                        isCenter={idx === 6}
                    />

                ))}
            </Frame>

            <button className="reset-btn" onClick={resetCalls}>Reset</button>
        </div>
    );
};

export default Abacus;
