import React, { useState, useEffect } from 'react';
import Frame from './Frame';
import Column from './Column';

const Abacus = () => {
    // Determine initial count based on current window width
    const getInitialRodCount = () => (window.innerWidth <= 768 ? 7 : 13);

    const [rodCount, setRodCount] = useState(getInitialRodCount);
    const [values, setValues] = useState(Array(getInitialRodCount()).fill(0));

    useEffect(() => {
        const handleResize = () => {
            const newCount = window.innerWidth <= 768 ? 7 : 13;
            // Only update if the count actually changes (e.g. crossing the breakpoint)
            setRodCount((prevCount) => {
                if (prevCount !== newCount) {
                    setValues(Array(newCount).fill(0)); // Reset values to avoid index issues
                    return newCount;
                }
                return prevCount;
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleColumnChange = (index, newVal) => {
        const newValues = [...values];
        newValues[index] = newVal;
        setValues(newValues);
    };

    const resetCalls = () => {
        setValues(Array(rodCount).fill(0));
    };

    // Calculate center rod index dynamically
    // For 13 rods: index 6. For 7 rods: index 3.
    const centerIndex = Math.floor(rodCount / 2);

    return (
        <div className="abacus-container">
            <div className="header-text">GSA Educational Council</div>

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
                        isCenter={idx === centerIndex}
                    />
                ))}
            </Frame>

            <button className="reset-btn" onClick={resetCalls}>Reset</button>
        </div>
    );
};

export default Abacus;
