import PropTypes from 'prop-types';
import React from 'react';

import { faPlay, faPause, faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Controls = ({ playPauseClick, resetClick }) => (
    <div className="controls">
        <button
            id="start_stop"
            onClick={playPauseClick}
        >
            <FontAwesomeIcon icon={faPlay} />
            <FontAwesomeIcon icon={faPause} />
        </button>
        <button
            id="reset"
            onClick={resetClick}
        >
            <FontAwesomeIcon icon={faSync} />
        </button>
    </div>
);

Controls.propTypes = {
    playPauseClick: PropTypes.func,
    resetClick: PropTypes.func
};

export default Controls;