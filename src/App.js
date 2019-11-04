import React, { Component } from 'react'

import './App.css';

import BrewMethodInput from './components/BrewMethodInput'
import QuantityInput from './components/QuantityInput';
import StrengthInput from './components/StrengthInput';
import Timer from './components/Timer';

const DefaultMethod = "Pour Over"
const DefaultWater = 558
const DefaultRatio = 15.5

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      method: DefaultMethod,
      goldenRatio: DefaultRatio,
      waterGrams: DefaultWater,
      error: null,
    }
  }

  componentDidMount() {
    const goldenRatio = parseFloat(localStorage.getItem('goldenRatio')) || DefaultRatio;
    const waterGrams = parseFloat(localStorage.getItem('waterGrams'))
        || DefaultWater;

    this.setState({ goldenRatio, waterGrams });
  }
  setMethod = (event) => {
    let method = event.target.value;
    this.setState({
      method: method
    })
  }

  setGoldenRatio = (event) => {
    let ratio = event.target.value.split(":");
    this.setState({
      goldenRatio: parseFloat(ratio[1]),
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

  saveSettings = () => {
    const { goldenRatio, waterGrams } = this.state;
    localStorage.setItem('goldenRatio', goldenRatio);
    localStorage.setItem('waterGrams', waterGrams);
  
  }

  render() {
    const { method, goldenRatio, waterGrams } = this.state

    return (
      <div className="App">
        <main>
          <BrewMethodInput
            method = {method}
            setMethod = {this.setMethod}
          />
          <StrengthInput 
            goldenRatio = {goldenRatio}
            setGoldenRatio = {this.setGoldenRatio}
          />
          <QuantityInput 
            waterGrams = {waterGrams}
            goldenRatio = {goldenRatio}
            updateWater = {this.updateWater}
          />
          <Timer />
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
