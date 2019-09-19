import React from 'react';
import PropTypes from 'prop-types';

const IncrementOrDecrementButton = ({ id, onClick, text }) => (
    <button
        className="incrementDecrement"
        id={id}
        type="button"
        onClick={onClick}
    >
        {text}
    </button>
);

IncrementOrDecrementButton.propTypes = {
    id: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string
};

const IncrementDecrementSet = ({ name, title, value, setQuantity }) => (
    <div className="incrementDecrement" id={`${name}-label`}>
        <h2>{title}</h2>
        <div className="interactions">
            <div id={`${name}-amount`}> {value} </div>
            <div className="increment">
                <IncrementOrDecrementButton
                    id={`${name}-increment`}
                    text="+"
                    onClick={setQuantity}
                />
                <IncrementOrDecrementButton
                    id={`${name}-decrement`}
                    text="-"
                    onClick={setQuantity}
                />
            </div>
        </div>
    </div>
);

IncrementDecrementSet.propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    interval: PropTypes.number,
    setQuantity: PropTypes.func
};

export { IncrementDecrementSet  };