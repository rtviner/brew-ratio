import React, { Component } from 'react'
import { IncrementDecrementSet } from './increment.js'
import { InputButton } from './inputButton.js'
import './App.css'

const DefaultWater = 558
const DefaultRatio = 15.5

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      goldenRatio: DefaultRatio,
      waterGrams: DefaultWater,
      error: null,
    }

    this.updateWater = this.updateWater.bind(this)
    this.setGoldenRatio = this.setGoldenRatio.bind(this)
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

  setGoldenRatio(event) {
    this.setState({
      goldenRatio: parseFloat(event.target.value),
    })
  }

  render() {
    const { waterGrams, goldenRatio } = this.state

    const cupsFromWater = (water, cupSize = 280) => {
      const possibleCups = water / cupSize
      const roundedPossibleCups = Math.round(possibleCups * 4) / 4
      return roundedPossibleCups
    }

    const coffeeGramsFromWater = (water, goldenRatio) => {
      const coffeeGrams = water / goldenRatio
      return Math.round(coffeeGrams)
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1>Brew Ratio</h1>
        </header>

        <main>
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
        </main>
      </div>
    )
  }
}

export default App
