import PropTypes from 'prop-types';
import React from 'react';

const InputButton = ({ className, id, name, value, onClick }) => (
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

InputButton.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onClick: PropTypes.func,
};

export default InputButton;