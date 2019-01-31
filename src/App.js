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
      selectedButton: 'no',
    };

    this.onSubmitChange = this.onSubmitChange.bind(this);
    this.onCupsSubmit = this.onCupsSubmit.bind(this);
    this.onButtonChange = this.onButtonChange.bind(this);
  }

  onButtonChange(event) {
    this.setState({ selectedButton: event.target.value })
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
    const { cups, ingredients, selectedButton } = this.state;
    const coffee = (ingredients.coffee);
    const water = (ingredients.water);

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
                onChange={this.onButtonChange}
                checked={this.state.selectedButton === 'yes'}
              />
              <RadioInput 
                value="no"
                onChange={this.onButtonChange}
                checked={this.state.selectedButton === 'no'}
              />
              </form>
          </div>
          { (this.state.selectedButton === 'yes')
            ? <div className="grindsInput">
                <div className="interactions">
                  <label>How much ground beans do you have (g)?
                    <CupGrindInput 
                      value={ingredients.coffee}
                      onChange={this.onSubmitChange}
                      onSubmit = {this.onCupsSubmit}
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
              </div>
            }  
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

const RadioInput = ({ value, onChange, checked }) =>
  <span className="radioButton">
    <input 
      type="radio"
      id={value}
      name="coffeeLowQuestion"
      value={value}
      onChange={onChange}
      deafaultChecked={checked}
    />
    <label for={value}>{value}</label>
  </span>
   

export default App;
