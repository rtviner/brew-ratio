import React, { useState, useEffect } from 'react';

import './App.css';
import {DefaultWater, DefaultRatio, DefaultSeconds, cupSize} from './defaultValues.js'
import {stepDownValue, stepUpValue} from './stepValue.js'

import QuantityInput from './components/QuantityInput';
import StrengthInput from './components/StrengthInput';
import Timer from './components/Timer';

const App = () => {
  const [goldenRatio, setGoldenRatio] = useState(DefaultRatio);
  const [waterGrams, setWaterGrams] = useState(DefaultWater);
  const [seconds, setSeconds] = useState(DefaultSeconds);
  const [timerOn, setTimerOn] = useState(false);
  
  useEffect(() => {
    const goldenRatio = parseFloat(localStorage.getItem('goldenRatio')) || DefaultRatio;
    const waterGrams = parseFloat(localStorage.getItem('waterGrams'))
        || DefaultWater;
    const seconds = parseFloat(localStorage.getItem('seconds'))
        || DefaultSeconds;

    setGoldenRatio(goldenRatio);
    setWaterGrams(waterGrams);
    setSeconds(seconds);
  }, []);

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

  const stepTime = (event) => {
    if (!timerOn && seconds < 420) {
      let newSeconds = 
        (event.target.innerText === '-') ? 
        stepDownValue(seconds, 1) :
        stepUpValue(seconds, 1);
      setSeconds(newSeconds);
    }  
  }

  const resetTimer = () => {
    setSeconds(DefaultSeconds);
    setTimerOn(false);
  };

  const playPause = () => {
    setTimerOn(!timerOn);
  };

  const updateGoldenRatio = (event) => {
    let ratio = event.target.value;
    setGoldenRatio(parseFloat(ratio));
  };

  const conversionFactors = {
    cups: cupSize,
    coffeeGrams: goldenRatio,
    waterGrams: 1
  };

  const updateWater = (event) => {
    const eventInfo = event.target.id.split('-');
    let conversionFactor = conversionFactors[eventInfo[0]];
    let incrementFactor = (eventInfo[0] === 'cups') ? conversionFactor/4 : conversionFactor;
    let value = event.target.type === 'number' ? event.target.value : waterGrams;
    let newWater;

    if (eventInfo[1] === 'decrement') { 
      newWater = stepDownValue(value,incrementFactor);
    } else if (eventInfo[1] === 'increment') {
      newWater = stepUpValue(value,incrementFactor);
    } else if (eventInfo[1] === 'amount') {
      newWater = value * conversionFactor;
    };
    setWaterGrams(newWater);
  };

  const saveSettings = () => {
    localStorage.setItem('goldenRatio', 
      goldenRatio);
    localStorage.setItem('waterGrams', 
      waterGrams);
    localStorage.setItem('seconds', seconds)
  };

  return (
    <div className="App">
      <main>
        <StrengthInput 
          goldenRatio = {goldenRatio}
          setGoldenRatio = {updateGoldenRatio}
        />
        <QuantityInput 
          waterGrams = {waterGrams}
          goldenRatio = {goldenRatio}
          updateWater = {updateWater}
        />
        <Timer 
          seconds = {seconds}
          stepTime = {stepTime}
          resetTimer = {resetTimer}
          playPause = {playPause}
        />
        <button
          id="saveSettings"
          className="rectButton"
          type="button"
          onClick={saveSettings}
        >
          Save Settings
        </button>
      </main>
    </div>
  );
};

export default App
