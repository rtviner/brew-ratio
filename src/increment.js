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

const IncrementDecrementSet = ({ name, title, value, measure, changeQuantity }) => (
    <div className="incrementDecrement" id={`${name}-label`}>
        <h2 className="title">{title}</h2>
        <p className="measure">{measure}</p>
        <div className="interactions">
            <div className="increment">
                <IncrementOrDecrementButton
                    id={`${name}-increment`}
                    text="+"
                    onClick={changeQuantity}
                />
                <input 
                    type="number" 
                    min="0"
                    value={value}
                    id={`${name}-amount`}
                    onChange={changeQuantity}
                />
                <IncrementOrDecrementButton
                    id={`${name}-decrement`}
                    text="-"
                    onClick={changeQuantity}
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

export { IncrementOrDecrementButton, IncrementDecrementSet  };