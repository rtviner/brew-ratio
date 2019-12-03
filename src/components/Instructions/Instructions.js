import PropTypes from 'prop-types';
import React from 'react';

const Instructions = ({ grindSize, list, waterGrams, goldenRatio }) => {
  if (!list) return null;
  const listItems = list.map((item, index) => 
    <li key={index}> 
      {item} 
     </li>);
  
  return (
    <div className="instructions">
      <h2>Brewing Instructions</h2>
      <p>Grind size: {grindSize}</p>
      <ol>{listItems}</ol>
    </div>
  )
};

Instructions.propTypes = {
    grindSize: PropTypes.string,
    list: PropTypes.array,
    waterGrams: PropTypes.number,
    goldenRatio: PropTypes.number,
};

export default Instructions;