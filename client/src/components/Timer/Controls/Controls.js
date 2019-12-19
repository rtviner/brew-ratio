import '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import React from 'react';

const Controls = ({ playPauseClick, resetClick }) => (
    <div className="controls">
        <button
            id="start_stop"
            onClick={playPauseClick}
        >
            <i className="fa fa-play" aria-hidden="true"/>
            <i className="fa fa-pause" aria-hidden="true"/>
        </button>
        <button
            id="reset"
            onClick={resetClick}
        >
            <i className="fa fa-refresh" aria-hidden="true"/>
        </button>
    </div>
);

Controls.propTypes = {
    playPauseClick: PropTypes.func,
    resetClick: PropTypes.func
};

export default Controls;