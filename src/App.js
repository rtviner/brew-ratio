import React, { Component } from 'react'
import { IncrementOrDecrementButton,IncrementDecrementSet } from './increment.js'
import { InputButton } from './inputButton.js'
import { TimerDisplay } from './timer.js'
import { Controls } from './timerControls.js'
import './App.css'

const DefaultWater = 558
const DefaultRatio = 15.5
const DefaultMinutes = 3
const DefaultSeconds = 0

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      goldenRatio: DefaultRatio,
      waterGrams: DefaultWater,
      timerEnd: 0,
      minutes: DefaultMinutes,
      seconds: DefaultSeconds,
      timerOn: false,
      error: null,
    }
  }

  componentDidMount() {
    const goldenRatio = parseFloat(localStorage.getItem('goldenRatio')) || DefaultRatio;
    const waterGrams = parseFloat(localStorage.getItem('waterGrams'))
        || DefaultWater;
    const minutes = parseFloat(localStorage.getItem('minutes'))
        || DefaultMinutes;
    const seconds = parseFloat(localStorage.getItem('seconds'))
        || DefaultSeconds;
    this.setState({ goldenRatio, waterGrams, minutes, seconds });
  }

  componentWillUnmount() {
    clearTimeout(this.tick)
  }

  setGoldenRatio = (event) => {
    this.setState({
      goldenRatio: parseFloat(event.target.value),
    })
  }

  updateWater = (event) => {
    const { waterGrams, goldenRatio } = this.state
    const eventInfo = event.target.id.split('-')
    let value = event.target.type === 'number' ? event.target.value : waterGrams
    let newWater

    if (eventInfo[0] === 'cups') {
      if (eventInfo[1] === 'amount') {
        newWater = value * 279
      } else {
        newWater =
          eventInfo[1] === 'decrement' && waterGrams >= 69.75
            ? value - 69.75
            : value + 69.75
      }
    } else if (eventInfo[0] === 'coffeeGrams') {
      if (eventInfo[1] === 'amount') {
        newWater = value * goldenRatio
      } else {
        newWater =
          eventInfo[1] === 'decrement' && waterGrams >= goldenRatio
            ? value - goldenRatio
            : value + goldenRatio
      }
    } else if (eventInfo[0] === 'waterGrams') {
      if (eventInfo[1] === 'amount') {
        newWater = value
      } else {
        newWater =
          eventInfo[1] === 'decrement' && waterGrams >= 1
            ? value - 1
            : value + 1
      }
    }
    this.setState({ waterGrams: newWater })
  }

  resetTimer = () => {
    this.stopTimer()
    this.setState({
      minutes: DefaultMinutes,
      seconds: DefaultSeconds,
    })
  }

  playPause = () => {
    if (this.state.timerOn) this.stopTimer()
    else this.countdown()
  }

  stopTimer = () => {
    this.setState({ timerOn: false })
    clearTimeout(this.tick)
  }

  countdown = () => {
    const { minutes, seconds } = this.state;
    let intervalTime = (minutes * 60)  + seconds;
    let endTime = new Date().getTime() + intervalTime * 1000 + 500

    this.setState({
      timerOn: true,
      timerEnd: endTime,
    })

    const updateClock = () => {
      let msLeft = endTime - new Date().getTime()
      // if (msLeft <= 0) {
      //     // make a ding noise
      // }
      if (msLeft >= 0) {
        let currentTime = new Date(msLeft)
        // intervalTime = Math.floor(msLeft / 1000),
        this.setState({
          minutes: currentTime.getUTCMinutes(),
          seconds: currentTime.getUTCSeconds(),
        })
        this.tick = setTimeout(
          updateClock,
          currentTime.getUTCMilliseconds() + 500
        )
      }
    }
    updateClock()
  }

  stepUpTime = () => {
    const { minutes, seconds } = this.state;
    const currentMinutes = minutes;
    const currentSeconds = seconds;
    let newMinutes;
    let newSeconds;
    if (seconds === 59) {
      newMinutes = currentMinutes + 1;
      newSeconds = 0;
      this.setState({ 
        minutes: newMinutes,
        seconds: newSeconds
      });
    }
    else if (minutes < 5) {
      newSeconds = currentSeconds + 1;
      this.setState({ seconds: newSeconds });
    }
  }

  stepDownTime = () => {
    const { minutes, seconds } = this.state;
    const currentMinutes = minutes;
    const currentSeconds = seconds;
    let newMinutes;
    let newSeconds;
    if (seconds === 0 && minutes > 2) {
      newMinutes = currentMinutes - 1;
      newSeconds = 59;
      this.setState({ 
        minutes: newMinutes,
        seconds: newSeconds 
      });
    }
    if (seconds > 0) {
      newSeconds = currentSeconds - 1;
      this.setState({ seconds: newSeconds });
    }
  }

  saveSettings = () => {
    const { goldenRatio, waterGrams, minutes, seconds } = this.state;
    localStorage.setItem('goldenRatio', goldenRatio);
    localStorage.setItem('waterGrams', waterGrams);
    localStorage.setItem('minutes', minutes);
    localStorage.setItem('seconds', seconds);
  }

  render() {
    const { waterGrams, goldenRatio, minutes, seconds } = this.state

    const cupsFromWater = (water, cupSize = 280) => {
      const possibleCups = water / cupSize
      const roundedPossibleCups = Math.round(possibleCups * 4) / 4
      return roundedPossibleCups
    }

    const coffeeGramsFromWater = (water, goldenRatio) => {
      const coffeeGrams = water / goldenRatio
      return Math.round(coffeeGrams)
    }

    let twoDigits = time => (time >= 10 ? time : `0${time}`)
    let countdownView = `${twoDigits(minutes) || '00'}:${twoDigits(seconds) ||
      '00'}`

    return (
      <div className="App">
        <main>
          <div className="strengthInput interactions">
            <h2>Coffee : Water</h2>
            <form>
              <div className="strength">
                <InputButton
                  className={goldenRatio === 18 ? 'active' : 'inactive'}
                  id="light"
                  name="goldenRatio"
                  value="18"
                  onClick={this.setGoldenRatio}
                />
                <label className="strength" htmlFor="light">
                  light
                </label>
              </div>

              <div className="strength">
                <InputButton
                  className={goldenRatio === 15.5 ? 'active' : 'inactive'}
                  id="med"
                  name="goldenRatio"
                  value="15.5"
                  onClick={this.setGoldenRatio}
                />
                <label className="strength" htmlFor="med">
                  medium
                </label>
              </div>

              <div className="strength">
                <InputButton
                  className={goldenRatio === 13 ? 'active' : 'inactive'}
                  id="strong"
                  name="goldenRatio"
                  value="13"
                  onClick={this.setGoldenRatio}
                />
                <label className="strength" htmlFor="strong">
                  strong
                </label>
              </div>
            </form>
          </div>

          <div id="adjustables">
            <IncrementDecrementSet
              name="cups"
              title="Brewed Cups"
              value={cupsFromWater(waterGrams)}
              measure="x 8oz"
              changeQuantity={this.updateWater}
            />
            <IncrementDecrementSet
              name="coffeeGrams"
              title="Ground Coffee"
              value={coffeeGramsFromWater(waterGrams, goldenRatio)}
              measure="g"
              changeQuantity={this.updateWater}
            />
            <IncrementDecrementSet
              name="waterGrams"
              title="Water"
              value={Math.round(waterGrams)}
              measure="mL or g"
              changeQuantity={this.updateWater}
            />
          </div>
          <div id="countdown-timer">
            <TimerDisplay time={countdownView} />
            <div className="increment timer">
              <IncrementOrDecrementButton 
                id="timer"
                onClick={this.stepUpTime}
                text="+"
              />
              <IncrementOrDecrementButton 
                id="timer"
                onClick={this.stepDownTime}
                text="-"
              />
            </div>
            <Controls
              playPauseClick={this.playPause}
              resetClick={this.resetTimer}
            />
          </div>
          <button
            id="saveSettings"
            className="rectButton"
            type="button"
            onClick={this.saveSettings}
          >
            Save Settings
          </button>
        </main>
      </div>
    )
  }
}

export default App
