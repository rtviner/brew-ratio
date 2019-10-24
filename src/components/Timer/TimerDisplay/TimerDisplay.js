import PropTypes from 'prop-types';
import React from 'react';

const TimerDisplay = ({ time }) => (
    <div 
        id="timer-display"
        className="timer"
    >
        <h3 id="time-left">
            {time}
        </h3>
    </div>
);

TimerDisplay.propTypes = {
    time: PropTypes.string
};

export default TimerDisplay;