import React from 'react';

const Frame = ({ children }) => {
    return (
        <div className="abacus-frame-outer">
            <div className="abacus-frame-inner">
                {children}
            </div>
            <div className="frame-details">
                {/* Metal corners or decorative elements */}
                <div className="corner top-left"></div>
                <div className="corner top-right"></div>
                <div className="corner bottom-left"></div>
                <div className="corner bottom-right"></div>
            </div>
        </div>
    );
};

export default Frame;
