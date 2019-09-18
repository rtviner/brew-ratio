import React, { Component } from 'react';
import { IncrementDecrementSet } from './increment.js';
import './App.css';

const DefaultCups = 2;
const DefaultCoffee = 36;
const DefaultWater = 560;
const DefaultRatio = "15.5";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goldenRatio: DefaultRatio, 
      cups: DefaultCups,
      coffee: DefaultCoffee,
      water: DefaultWater, 
      error: null,
    };

    this.onClick = this.onClick.bind(this);
    this.onSubmitCoffee = this.onSubmitCoffee.bind(this);
    this.onSubmitCups = this.onSubmitCups.bind(this);
  }

  onClick(event) {
    const target = event.target;
    const value = event.target.value;
    const name = target.name;

    (target.type === 'button')
      ? this.setState({ [name]: value })
      : (!(value)) //if empty string is submitted set state value to zero***
      ? this.setState({ [name]: ""})
      : this.setState({ [name]: parseFloat(value)});
  }

  onSubmitCoffee(event) {
    const { coffee, goldenRatio } = this.state;
    this.setCups(coffee, parseFloat(goldenRatio));
    event.preventDefault();
  }

  onSubmitCups(event) {
    const { cups, goldenRatio } = this.state;
    this.setIngredients(cups, parseFloat(goldenRatio));
    event.preventDefault();
  }

  setCups(coffee, goldenRatio, cupSize = 280) {
    const possibleCups = (coffee * goldenRatio) / cupSize;
    const roundedPossibleCups = Math.round(possibleCups * 4) / 4;

    this.setIngredients(roundedPossibleCups, goldenRatio);
  }

  setIngredients(cups, goldenRatio, cupSize=280) {   
    const waterGrams = Math.round(cups * cupSize);
    const coffeeGrams = Math.round(waterGrams / goldenRatio);

    this.setState({
        cups: cups,
        coffee: coffeeGrams,
        water: waterGrams
    });
  }

  render() {
    const { cups, coffee, water, goldenRatio } = this.state;

    return (

      <div className="App">
        <header className="App-header">
          <h1>Brew Ratio</h1>
        </header>

        <main>
          <div id="adjustables">
            <IncrementDecrementSet
              name="servings"
              title="Servings (8oz)"
              interval={cups}
              setIntervalTime={this.onSubmitCups}
            />
            <IncrementDecrementSet
              name="coffee"
              title="Ground Coffee (g)"
              interval={coffee}
              setIntervalTime={this.onSubmitWater}
            />
            <IncrementDecrementSet
              name="water"
              title="Water (g)"
              interval={water}
            />
          </div>

          <div className="strengthInput interactions">
            <h2>Coffee:1g Water</h2>
            <form> 

              <div className="strength"> 
                  <ButtonInput
                    className = {(goldenRatio === "18") ? "active" : "inactive"} 
                    id="light"
                    name="goldenRatio"
                    value="18"
                    onClick={this.onClick}
                  />
                <label className="strength" htmlFor="light">light</label>
              </div>

              <div className="strength">
                <ButtonInput
                  className = {(goldenRatio === "15.5") ? "active" : "inactive"} 
                  id="med"
                  name="goldenRatio"
                  value="15.5"
                  onClick={this.onClick}
                />
                <label className="strength" htmlFor="med">medium</label>
              </div>

              <div className="strength">
                <ButtonInput
                   className = {(goldenRatio === "13") ? "active" : "inactive"}
                  id="strong"
                  name="goldenRatio"                
                  value="13"
                  onClick={this.onClick}
                />
                <label className="strength" htmlFor="strong">strong</label>
              </div>

            </form>
          </div>

        </main>
      </div>
    );
  }
}

const ButtonInput = ({ className, id, name, value, onClick }) =>
  <span className="button">
    <input
      className = {className}
      type="button"
      id={id}
      name={name}
      value={value}
      onClick={onClick}
    />   
  </span>

export default App;
