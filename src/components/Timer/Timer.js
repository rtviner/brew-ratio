import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Controls from './Controls';
import TimerDisplay from './TimerDisplay';
import IncrementDecrementButton from '../shared/IncrementDecrementButton';

const Timer = () => {
  const DefaultSeconds = 180;
  let twoDigits = time => (time >= 10 ? time : `0${time}`);

  const countdownView = (seconds) => {
    let minutes = Math.floor(seconds/60);
    let secondsLeft = seconds % 60;

    return `${twoDigits(minutes) || '00'}:${twoDigits(secondsLeft) || '00'}`; 
  } 
  

  const [seconds, setSeconds] = useState(DefaultSeconds);
  const [timerOn, setTimerOn] = useState(false);
  
  // useEffect(() => {
  //   const seconds = parseFloat(localStorage.getItem('seconds'))
  //       || DefaultSeconds;

  //   setSeconds(seconds);
  // }, []);

  useEffect(() => {
    var tick = null;
    
    if (timerOn && seconds > 0) {
      let endTime = new Date().getTime() +seconds * 1000 + 500;

      const updateClock = () => {
        let msLeft = endTime - new Date().getTime();

        if (msLeft >= 0) {
          setSeconds(Math.floor(msLeft/1000));

          tick = setTimeout(
            updateClock,
            new Date(msLeft).getUTCMilliseconds() + 500
          );
        }
      }
      updateClock()
    } else if (!timerOn) {
      clearInterval(tick);
    }
    return () => clearInterval(tick);
  }, [timerOn, seconds]);

  const stepUpTime = () => {
    const currentSeconds = seconds;

    if (!timerOn && currentSeconds < 420) {
      let newSeconds = currentSeconds + 1;
      setSeconds(newSeconds);
    }
  }

  const stepDownTime = () => {
    const currentSeconds = seconds;

    if (!timerOn && seconds > 0) {
      let newSeconds = currentSeconds - 1;
      setSeconds(newSeconds);
    }
  };

  const resetTimer = () => {
    setSeconds(DefaultSeconds);
    setTimerOn(false);
  }

  const playPause = () => {
    setTimerOn(!timerOn);
  }

  return (
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
      <TimerDisplay time={countdownView(seconds)} />
      <Controls
        playPauseClick={playPause}
        resetClick={resetTimer}
      />
    </div>
  );
};

Timer.propTypes = {
    stepUpTime: PropTypes.func,
    stepDownTime: PropTypes.func,
    countdownView: PropTypes.string,
    playPause: PropTypes.func,
    resetTimer: PropTypes.func
};

export default Timer;