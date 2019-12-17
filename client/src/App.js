import React, { useState, useEffect } from 'react'

import './App.css'

import BrewMethodInput from './components/BrewMethodInput'
import Instructions from './components/Instructions'
import QuantityInput from './components/QuantityInput'
import StrengthInput from './components/StrengthInput'
import Timer from './components/Timer'
import {
  aeroCupSize,
  DefaultCupSize,
  DefaultMethod,
  DefaultRatio,
  DefaultSeconds,
  DefaultWater,
} from './constants'
import { stepDownValue, stepUpValue } from './utils'
// import instructionsData from "./instructions.json";
const DefaultInstructionsUrl = "/instructions";

const App = () => { 
  const [cupSize, setCupSize] = useState(DefaultCupSize);
  const [goldenRatio, setGoldenRatio] = useState(DefaultRatio);
  const [instructions, setInstructions] = useState("");
  const [method, setMethod] = useState(DefaultMethod);
  const [seconds, setSeconds] = useState(DefaultSeconds);
  const [timerOn, setTimerOn] = useState(false);
  const [waterGrams, setWaterGrams] = useState(DefaultWater);

  useEffect(() => {
    const method = localStorage.getItem('method') || DefaultMethod
    const goldenRatio =
      parseFloat(localStorage.getItem('goldenRatio')) || DefaultRatio
    const waterGrams =
      parseFloat(localStorage.getItem('waterGrams')) || DefaultWater
    const seconds =
      parseFloat(localStorage.getItem('seconds')) || DefaultSeconds

    setMethod(method)
    setGoldenRatio(goldenRatio)
    setWaterGrams(waterGrams)
    setSeconds(seconds)
  }, [])

 
  useEffect(() => {
    fetchData();
  }, [method]);

  useEffect(() => {
    var tick = null

    if (timerOn && seconds > 0) {
      let endTime = new Date().getTime() + seconds * 1000 + 500

      const updateClock = () => {
        let msLeft = endTime - new Date().getTime()

        if (msLeft >= 0) {
          setSeconds(Math.floor(msLeft / 1000))

          tick = setTimeout(
            updateClock,
            new Date(msLeft).getUTCMilliseconds() + 500
          )
        }
      }
      updateClock()
    } else if (!timerOn) {
      clearInterval(tick)
    }
    return () => clearInterval(tick)
  }, [timerOn, seconds])

  async function fetchData() {
    try {
      const response = await fetch(`${DefaultInstructionsUrl}?brewMethod=${method}`);
      const json = await response.json();
      let instructionsData = json;
      setInstructions(instructionsData[0]);
    } catch (error) {
      console.log(error);
    }
  }
  const stepTime = event => {
    if (!timerOn && seconds < 420) {
      let newSeconds =
        event.target.innerText === '-'
          ? stepDownValue(seconds, 1)
          : stepUpValue(seconds, 1)
      setSeconds(newSeconds)
    }
  }

  const resetTimer = () => {
    setSeconds(DefaultSeconds)
    setTimerOn(false)
  }

  const playPause = () => {
    setTimerOn(!timerOn)
  }

  const updateGoldenRatio = event => {
    let ratio = event.target.value
    setGoldenRatio(parseFloat(ratio))
  }

  const conversionFactors = {
    cups: cupSize,
    coffeeGrams: goldenRatio,
    waterGrams: 1,
  }

  const updateWater = event => {
    const eventInfo = event.target.id.split('-')
    let conversionFactor = conversionFactors[eventInfo[0]]
    let incrementFactor =
      eventInfo[0] === 'cups' ? conversionFactor / 4 : conversionFactor
    let value = event.target.type === 'number' ? event.target.value : waterGrams
    let newWater

    if (eventInfo[1] === 'decrement') {
      newWater = stepDownValue(value, incrementFactor)
    } else if (eventInfo[1] === 'increment') {
      newWater = stepUpValue(value, incrementFactor)
    } else if (eventInfo[1] === 'amount') {
      newWater = value * conversionFactor
    }
    setWaterGrams(newWater)
  }

  const changeMethod = event => {
    let method = event.target.value
    let cupSize = (method === 'AeroPress') ? aeroCupSize : DefaultCupSize;
    let ratio = (method === 'AeroPress') ? 13 : DefaultRatio;
    let water = (method === 'AeroPress') ? 220 : DefaultWater;
    let brewTime = (method === 'AeroPress') ? 120 : DefaultSeconds;
    //change instructions in here too...
    setCupSize(cupSize);
    setGoldenRatio(ratio);
    setMethod(method);
    setSeconds(brewTime);
    setWaterGrams(water);
  }

  const saveSettings = () => {
    localStorage.setItem('method', method)
    localStorage.setItem('goldenRatio', goldenRatio)
    localStorage.setItem('waterGrams', waterGrams)
    localStorage.setItem('seconds', seconds)
  }
  if (!instructions) {return null;}
  
  return (
    <div className="App">
      <main>
        <BrewMethodInput
          method={method}
          changeMethod={changeMethod}
        />
        <StrengthInput
          goldenRatio={goldenRatio}
          setGoldenRatio={updateGoldenRatio}
        />
        <QuantityInput
          waterGrams={waterGrams}
          goldenRatio={goldenRatio}
          cupSize={cupSize}
          updateWater={updateWater}
        />
        <Timer
          seconds={seconds}
          stepTime={stepTime}
          resetTimer={resetTimer}
          playPause={playPause}
        />
        <button
          id="saveSettings"
          className="rectButton"
          type="button"
          onClick={saveSettings}
        >
          Save Settings
        </button>
        <Instructions
          grindSize={instructions['grindSize']}
          list={instructions['steps'].split(".,")}
          goldenRatio={goldenRatio}
          waterGrams={waterGrams}
        />
      </main>
    </div>
  )
}

export default App
