import PropTypes from 'prop-types';
import React from 'react';

import Controls from '../Controls';
import IncrementDecrementButton from '../shared/IncrementDecrementButton';
import TimerDisplay from '../TimerDisplay';

let minutes = 2;
let seconds = 30;

let twoDigits = time => (time >= 10 ? time : `0${time}`);

let countdownView = `${twoDigits(minutes) || '00'}:${twoDigits(seconds) || '00'}`;

const Timer = ({ stepUpTime, stepDownTime, playPause, resetTimer  }) => (
    <div id="countdown-timer">
      <div className="increment timer">
        <IncrementDecrementButton 
          id="timer"
          onClick={stepUpTime}
          text="+"
        />
        <IncrementDecrementButton 
          id="timer"
          onClick={stepDownTime}
          text="-"
        />
      </div>
      <TimerDisplay time={countdownView} />
      <Controls
        playPauseClick={playPause}
        resetClick={resetTimer}
      />
    </div>
);

Timer.propTypes = {
    stepUpTime: PropTypes.func,
    stepDownTime: PropTypes.func,
    countdownView: PropTypes.string,
    playPause: PropTypes.func,
    resetTimer: PropTypes.func
};

export default Timer;