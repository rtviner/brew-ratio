import PropTypes from 'prop-types';
import React from 'react';

const IncrementDecrementButton = ({ id, onClick, text }) => (
    <button
        className="incrementDecrement"
        id={id}
        type="button"
        onClick={onClick}
    >
        {text}
    </button>
);

IncrementDecrementButton.propTypes = {
    id: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string
};

export default IncrementDecrementButton;