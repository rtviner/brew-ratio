import React from 'react';
import PropTypes from 'prop-types';

const ButtonInput = ({ className, id, name, value, onClick }) => (
  <span className="button">
    <input
      className = {className}
      type="button"
      id={id}
      name={name}
      value={value}
      onClick={onClick}
    />   
  </span>
);

ButtonInput.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onClick: PropTypes.func,
};
