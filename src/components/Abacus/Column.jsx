import React from 'react';
import Bead from './Bead';
import { playBeadSound } from '../../utils/audio';

const Column = ({ value, onChange, isCenter }) => {
    const heavenActive = value >= 5;
    const earthVal = value % 5; // 0-4


    const handleHeavenClick = () => {
        playBeadSound();
        if (heavenActive) {
            onChange(value - 5);
        } else {
            onChange(value + 5);
        }
    };

    const handleEarthClick = (index) => {
        playBeadSound();
        // index 0 is top-most earth bead (closest to beam)
        // index 3 is bottom-most

        // Check if clicked bead is currently active (UP)
        // Active earth beads are 0 to earthVal-1.
        const isClickedActive = index < earthVal;

        if (isClickedActive) {
            // It's UP, so we move it DOWN.
            // E.g. beads 0,1 are up (val 2). Click index 0 (top one).
            // We want new val to be 0? 
            // If I click the bottom-most active bead (index 1), I want new val 1.
            // If I click index 0, I want new val 0.
            // So newEarthVal = index.
            onChange((heavenActive ? 5 : 0) + index);
        } else {
            // It's DOWN, we move it UP.
            // E.g. val 0. Click index 1. We want beads 0 and 1 to move up.
            // new val 2.
            // newEarthVal = index + 1
            onChange((heavenActive ? 5 : 0) + index + 1);
        }
    };

    return (
        <div className="column">
            <div className="rod"></div>

            {/* Heaven Deck */}
            <div className="deck heaven">
                <Bead
                    type="heaven"
                    active={heavenActive}
                    onClick={handleHeavenClick}
                />
            </div>

            <div className={`beam ${isCenter ? 'center-rod' : ''}`}>
                {isCenter && <div className="unit-dot"></div>}
            </div>


            {/* Earth Deck */}
            <div className="deck earth">
                {[0, 1, 2, 3].map((i) => (
                    <Bead
                        key={i}
                        type="earth"
                        active={i < earthVal}
                        className={i === earthVal ? 'gap-above' : ''}
                        onClick={() => handleEarthClick(i)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Column;

