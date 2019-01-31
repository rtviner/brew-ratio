import React, { Component } from 'react';
import './App.css';

const DefaultCups = 2;
const DefaultRatio = 15.5;
const CoffeeGrindsLabel = "g coffee (ground)";
const CupsLabel = "10oz cups"

// input grams of water per 1 cup and desired cups (user input number) and output will be the number of grams of water required to make those desired cups
// const WaterGrams = (cupSizeML = 280, desiredCups) => cupSizeML * desiredCups;
//input waterGrams needed for desiredCups of coffee and goldenRatio (grams of water per 1 gram coffee) and outputs coffee grams required to make desired cups.
// const CoffeeGrams = (waterGrams, goldenRatio = 15) => waterGrams / goldenRatio;
//input coffeeGrams available (user input number) and goldenRatio and outPuts number of cups possible
// const DesiredCups = (coffeeGrams, goldenRatio = 15) => coffeeGrams / goldenRatio;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cups: DefaultCups,
      goldenRatio: DefaultRatio,
      ingredients: '',
      error: null,
    };

    this.onSubmitChange = this.onSubmitChange.bind(this);
    this.onCupsSubmit = this.onCupsSubmit.bind(this);
  }

  onSubmitChange(event) {
    //make sure input is a number here or post an error message
    (isNaN(event.target.value)) ? this.setState({ cups: 0}): this.setState({ cups: event.target.value });
  }

  onCupsSubmit(event) {
    const { cups } = this.state;
    const { goldenRatio } = this.state;
    this.setIngredients(cups, goldenRatio); 
    event.preventDefault();
  }

  setIngredients(cups, goldenRatio) {
    const cupSize = 280;
    const waterGrams = Math.round(cupSize * cups);
    // const coffeeGrams = (waterGrams, goldenRatio = 15) => waterGrams / goldenRatio;
    const coffeeGrams = Math.round(waterGrams / goldenRatio);

    this.setState({
      ingredients: {
        coffee: coffeeGrams,
        water: waterGrams
      }
    });
  }

  render() {
    const { cups, ingredients} = this.state;
    const coffee = (ingredients.coffee);
    const water = (ingredients.water);

    return (
      <div className="App">
        <header className="App-header">
          <h1>Brew Ratio</h1>
        </header>
        <main>
          <div className="interactions">
          <h2>How much brewed coffee would you like?</h2>
            <label>Desired {CupsLabel}:
              <CupGrindInput 
                value={cups}
                onChange={this.onSubmitChange}
                onSubmit = {this.onCupsSubmit}
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
          <div className="interactions">
            <label>Coffee beans running low?
              <RadioInput />
            </label>          
            <label>How much ground beans do you have (g)?
              <CupGrindInput 
                value={ingredients.coffee}
                onChange={this.onSubmitChange}
                onSubmit = {this.onCupsSubmit}
              >
              </CupGrindInput>
              <Ingredients
                coffee={cups}
                water={water}
                label={CupsLabel}
              >
              </Ingredients>
            </label>
          </div>
        </main>
      </div>
    );
  }
}

const CupGrindInput = ({value, onChange, onSubmit}) =>
        <form onSubmit = {onSubmit}>
            <input
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

const RadioInput = ({ value, onChange, onSubmit}) =>
  <form>
    <input 
      type="radio"
      id="yes"
      name="coffeeLowQuestion"
      value="yes"
    />
    <label for="yes">yes</label>
    <input 
      type="radio"
      id="no"
      name="coffeeLowQuestion"
      value="no"
      checked
    />
    <label for="no">no</label>
  </form>

export default App;
