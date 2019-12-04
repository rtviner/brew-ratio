import React from 'react';
import PropTypes from 'prop-types';


import Controls from './Controls';
import TimerDisplay from './TimerDisplay';
import IncrementDecrementButton from '../shared/IncrementDecrementButton';


const Timer = ({seconds, stepTime, resetTimer, playPause}) => {  
  let twoDigits = time => (time >= 10 ? time : `0${time}`);

  const countdownView = (seconds) => {
    let minutes = Math.floor(seconds/60);
    let secondsLeft = seconds % 60;

    return `${twoDigits(minutes) || '00'}:${twoDigits(secondsLeft) || '00'}`; 
  } 
  
  return (
    <div id="countdown-timer">
      <div className="increment timer">
        <IncrementDecrementButton 
          id="timer"
          onClick={stepTime}
          text="+"
        />
        <IncrementDecrementButton 
          id="timer"
          onClick={stepTime}
          text="-"
        />
      </div>
      <TimerDisplay time={countdownView(seconds)} />
      <Controls
        playPauseClick={playPause}
        resetClick={resetTimer}
      />
    </div>
  );
};

Timer.propTypes = {
    seconds: PropTypes.number,
    stepTime: PropTypes.func,
    countdownView: PropTypes.string,
    playPause: PropTypes.func,
    resetTimer: PropTypes.func
};

export default Timer;