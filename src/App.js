import React, { Component } from 'react';
import './App.css';

const DefaultCups = 2;
const DefaultCoffee = 36;
const DefaultWater = 560;
const DefaultRatio = 15.5;
const CoffeeGrindsLabel = "g coffee (ground)";
const CupsLabel = "10oz cups";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goldenRatio: DefaultRatio, 
      cups: DefaultCups,
      coffee: DefaultCoffee,
      water: DefaultWater, 
      error: null,
      selectedButton: 'no',
    };

    this.onSubmitChange = this.onSubmitChange.bind(this);
    this.onSubmitCoffee = this.onSubmitCoffee.bind(this);
    this.onSubmitCups = this.onSubmitCups.bind(this);
  }

  onSubmitChange(event) {
    const target = event.target;
    const value = event.target.value;
    const name = target.name;

    (target.type === 'checkbox') 
      ? this.setState({ selectedButton: value })
      : (!value) //if empty string or 0 is submitted convert to value in state to 0
      ? this.setState({ [name]: 0})
      : this.setState({ [name]: parseFloat(value) });
  }

  onSubmitCoffee(event) {
    const { coffee, goldenRatio } = this.state;
    this.setCups(coffee, goldenRatio);
    event.preventDefault();
  }

  onSubmitCups(event) {
    const { cups, goldenRatio } = this.state;
    this.setIngredients(cups, goldenRatio);
    event.preventDefault();
  }

  setCups(coffee, goldenRatio, cupSize = 280) {
    //update possible cups to round to 1 decimal spot (1.5 cups instead of 1.4946428...)
    const possibleCups = (coffee * goldenRatio) / cupSize;
    this.setIngredients(possibleCups, goldenRatio);
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
    const { cups, coffee, water, selectedButton } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Brew Ratio</h1>
        </header>
        <main>
          <div className="interactions">
            <h2>Coffee beans running low?</h2>
            <p>Check "yes" below if you have a random amount of ground coffee left to brew.</p>
            <p>Check "no" if you prefer to brew a specific number of cups.</p>
            <form>
              <RadioInput 
                value="yes"
                onChange={this.onSubmitChange}
                checked={selectedButton === 'yes'}
              />
              <RadioInput 
                value="no"
                onChange={this.onSubmitChange}
                checked={selectedButton === 'no'}
              />
              </form>
          </div>
          { (selectedButton === 'yes')
            ? <div className="grindsInput">
                <div className="interactions">
                  <label>How much ground beans do you have (g)?
                    <CupGrindInput 
                      name='coffee'
                      value={coffee}
                      onChange={this.onSubmitChange}
                      onSubmit = {this.onSubmitCoffee}
                    >
                    </CupGrindInput>
                  </label>
                </div>  
                <Ingredients
                  coffee={cups}
                  water={water}
                  label={CupsLabel}
                >
                </Ingredients>
              </div>  
            : <div className="cupsInput">
                <div className="interactions">
                  <label>Desired {CupsLabel}:
                    <CupGrindInput 
                      name='cups'
                      value={cups}
                      onChange={this.onSubmitChange}
                      onSubmit = {this.onSubmitCups}
                    >
                    </CupGrindInput>
                  </label>   
                </div>
                <Ingredients
                  coffee={coffee}
                  water={water}
                  label={CoffeeGrindsLabel}
                >
                </Ingredients>
              </div>
            }  
        </main>
      </div>
    );
  }
}

const CupGrindInput = ({name, value, onChange, onSubmit}) =>
        <form onSubmit = {onSubmit}>
            <input
              name={name}
              type="number"
              step=".01"
              value={value}
              onChange={onChange}
            />
          <button type="submit" >
            Submit
          </button>
        </form>

const Ingredients = ({ coffee, water, label }) =>
  <div className="ingredients">
    <div className="coffeeOrCups">
      {coffee} {label}
    </div>
    <div className="water"> 
      {water}g water
    </div>
  </div>

const RadioInput = ({ value, onChange, checked }) =>
  <span className="radioButton">
    <input 
      type="checkbox"
      id={value}
      name="coffeeLowQuestion"
      value={value}
      onChange={onChange}
      checked={checked}
    />
    <label htmlFor={value}>{value}</label>
  </span>
   

export default App;
