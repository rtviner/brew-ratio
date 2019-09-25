import React, { Component } from 'react'
import { IncrementDecrementSet } from './increment.js'
import { InputButton } from './inputButton.js'
import { TimerDisplay } from './timer.js'
import { Controls } from './timerControls.js'
import './App.css'

const DefaultWater = 558
const DefaultRatio = 15.5
const DefaultMinutes = 3
const DefaultSeconds = 30

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      goldenRatio: DefaultRatio,
      waterGrams: DefaultWater,
      timerEnd: 0,
      minutes: DefaultMinutes,
      seconds: DefaultSeconds,
      intervalTime: DefaultMinutes * 60 + DefaultSeconds,
      timerOn: false,
      error: null,
    }

    this.setGoldenRatio = this.setGoldenRatio.bind(this)
    this.updateWater = this.updateWater.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.playPause = this.playPause.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    // this.stepUpTime = this.stepUpTime.bind(this)
    // this.stepDownTime = this.stepDownTime.bind(this)
  }

  componentWillUnmount() {
    clearTimeout(this.tick)
  }

  setGoldenRatio(event) {
    this.setState({
      goldenRatio: parseFloat(event.target.value),
    })
  }

  updateWater(event) {
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

  resetTimer() {
    this.stopTimer()
    this.setState({
      minutes: DefaultMinutes,
      seconds: DefaultSeconds,
      intervalTime: DefaultMinutes * 60 + DefaultSeconds,
    })
  }

  playPause() {
    if (this.state.timerOn) this.stopTimer()
    else this.countdown()
  }

  stopTimer = () => {
    this.setState({ timerOn: false })
    clearTimeout(this.tick)
  }

  countdown() {
    const { intervalTime } = this.state
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
        this.setState({
          intervalTime: Math.floor(msLeft / 1000),
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

  // stepUpTime () {
  //   console.log("up up")
  // }

  // stepDownTime () {
  //   console.log("down down")
  // }

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

          <TimerDisplay time={countdownView} />
          <Controls
            playPauseClick={this.playPause}
            resetClick={this.resetTimer}
          />
        </main>
      </div>
    )
  }
}

export default App
