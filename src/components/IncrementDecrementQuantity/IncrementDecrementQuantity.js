import React from 'react';
import PropTypes from 'prop-types';

import IncrementDecrementButton from '../shared/IncrementDecrementButton'

const IncrementDecrementQuantity = ({ name, title, value, measure, changeQuantity }) => (
    <div className="incrementDecrement" id={`${name}-label`}>
        <h2 className="title">{title}</h2>
        <p className="measure">{measure}</p>
        <div className="interactions">
            <div className="increment">
                <IncrementDecrementButton
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
                <IncrementDecrementButton
                    id={`${name}-decrement`}
                    text="-"
                    onClick={changeQuantity}
                />
            </div>
        </div>
    </div>
);

IncrementDecrementQuantity.propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.number,
    measure: PropTypes.string,
    setQuantity: PropTypes.func
};

export default IncrementDecrementQuantity;