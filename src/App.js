import React, { Component } from 'react';
import './App.css';

const DefaultCups = 2;
const DefaultCoffee = 36;
const DefaultWater = 560;
const DefaultRatio = 15.5;
const CoffeeGrindsLabel = "g coffee (ground)";
const CupsLabel = "10oz cups"

//input coffeeGrams available (user input number) and goldenRatio and outPuts number of cups possible
// const DesiredCups = (coffeeGrams, goldenRatio = 15) => coffeeGrams / goldenRatio;

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
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmitChange(event) {
    const target = event.target;
    const value = event.target.value;
    const name = target.name;
    //make sure input is a number here or post an error message
    if (target.type === 'checkbox') {
      this.setState({ selectedButton: value });
    }
    else {  
      (isNaN(value)) 
      ? this.setState({ [name]: 0})
      : this.setState({ [name]: parseFloat(value) });
    } 
  }

  onSubmit(event) {
    const { cups } = this.state;
    const { goldenRatio } = this.state;
    this.setIngredients(cups, goldenRatio); 
    event.preventDefault();
  }

  setCups(coffee, goldenRatio) {
    const possibleCups = Math.round(coffee / goldenRatio);
    this.setIngredients(possibleCups, goldenRatio);
  }

  setIngredients(cups, goldenRatio) {
    const cupSize = 280;
    const waterGrams = Math.round(cupSize * cups);
    // const coffeeGrams = (waterGrams, goldenRatio = 15) => waterGrams / goldenRatio;
    const coffeeGrams = Math.round(waterGrams / goldenRatio);

    this.setState({
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
                      name={'coffee'}
                      value={coffee}
                      onChange={this.onSubmitChange}
                      onSubmit = {this.onSubmit}
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
                      name={'cups'}
                      value={cups}
                      onChange={this.onSubmitChange}
                      onSubmit = {this.onSubmit}
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
