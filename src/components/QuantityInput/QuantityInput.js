import PropTypes from 'prop-types';
import React from 'react';
import IncrementDecrementQuantity from './IncrementDecrementQuantity'

const cupsFromWater = (cupSize, water) => {
  const possibleCups = water / cupSize
  const roundedPossibleCups = Math.round(possibleCups * 4) / 4
  return roundedPossibleCups
};

const coffeeGramsFromWater = (goldenRatio, water) => {
  const coffeeGrams = water / goldenRatio
  return Math.round(coffeeGrams)
};

//wrap this in form not div
const QuantityInput = ({ cupSize, waterGrams, goldenRatio, updateWater }) => (
    <div className="adjustables"> 
      <IncrementDecrementQuantity
        name="cups"
        title="Brewed Cups"
        value={cupsFromWater(cupSize, waterGrams)}
        measure="8oz"
        changeQuantity={updateWater}
      />
      <IncrementDecrementQuantity
        name="coffeeGrams"
        title="Ground Coffee"
        value={coffeeGramsFromWater(goldenRatio,waterGrams)}
        measure="g"
        changeQuantity={updateWater}
      />
      <IncrementDecrementQuantity
        name="waterGrams"
        title="Water"
        value={Math.round(waterGrams)}
        measure="g/mL"
        changeQuantity={updateWater}
      />
    </div>
);

QuantityInput.propTypes = {
    cupSize: PropTypes.number,
    waterGrams: PropTypes.number,
    goldenRatio: PropTypes.number,
    updateWater: PropTypes.func
};

export default QuantityInput;