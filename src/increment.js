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

const IncrementDecrementSet = ({ name, title, value, measure, setQuantity }) => (
    <div className="incrementDecrement" id={`${name}-label`}>
        <h2>{title}</h2>
        <div className="interactions">
            <input 
                type="number" 
                min="0"
                value={value}
                id={`${name}-amount`}
                onChange={setQuantity}
            />
            <p className="measure">{measure}</p>
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
    value: PropTypes.number,
    measure: PropTypes.string,
    setQuantity: PropTypes.func
};

export { IncrementDecrementSet  };