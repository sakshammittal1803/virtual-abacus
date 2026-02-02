import React from 'react';

const Bead = ({ active, type, onClick, className = '' }) => {
    // type: 'heaven' or 'earth'
    // active: boolean

    return (
        <div
            className={`bead ${type} ${active ? 'active' : ''} ${className}`}
            onClick={onClick}
        >
            <div className="bead-shine"></div>
        </div>
    );
};
export default Bead;
