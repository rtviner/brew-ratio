import React from 'react';

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

// IncrementOrDecrementButton.propTypes = {
//     id: PropTypes.string,
//     onClick: PropTypes.func,
//     text: PropTypes.string
// };

const IncrementDecrementSet = ({ name, title, interval, setIntervalTime }) => (
    <div className="timer" id={`${name}-label`}>
        <h2>{title}</h2>
        <div className="interactions">
            <div id={`${name}-length`}> {interval} </div>
            <div className="increment">
                <IncrementOrDecrementButton
                    id={`${name}-increment`}
                    text="+"
                    onClick={setIntervalTime}
                />
                <IncrementOrDecrementButton
                    id={`${name}-decrement`}
                    text="-"
                    onClick={setIntervalTime}
                />
            </div>
        </div>
    </div>
);

// IncrementDecrementSet.propTypes = {
//     name: PropTypes.string,
//     title: PropTypes.string,
//     interval: PropTypes.number,
//     setIntervalTime: PropTypes.func
// };

export { IncrementDecrementSet  };