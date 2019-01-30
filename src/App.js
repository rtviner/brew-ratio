import React, { Component } from 'react';
import './App.css';

const DefaultCups = 2;

// input grams of water per 1 cup and desired cups (user input number) and output will be the number of grams of water required to make those desired cups
const WaterGrams = (cupSizeML = 280, desiredCups) => cupSizeML * desiredCups;

//input waterGrams needed for desiredCups of coffee and goldenRatio (grams of water per 1 gram coffee) and outputs coffee grams required to make desired cups.
const CoffeeGrams = (waterGrams, goldenRatio = 15) => waterGrams / goldenRatio;

//input coffeeGrams available (user input number) and goldenRatio and outPuts number of cups possible
const DesiredCups = (coffeeGrams, goldenRatio = 15) => coffeeGrams / goldenRatio;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cupsKey: '',
      cups: DefaultCups,
      ingredients: '',
      error: null,
    };

    this.onSubmitChange = this.onSubmitChange.bind(this);
    this.onCupsSubmit = this.onCupsSubmit.bind(this);
  }

  onSubmitChange(event) {
    this.setState({ cups: event.target.value });
  }

  onCupsSubmit(event) {
    const { cups } = this.state;
    this.setState({ cupsKey: cups });
    event.preventDefault();
  }

  render() {
    const { cups, ingredients, error} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Brew Ratio</h1>
        </header>
        <main>
          <div className="interactions">
            <CupInput 
              value={cups}
              onChange={this.onSubmitChange}
              onSubmit = {this.onCupsSubmit}
            >

            </CupInput>
          </div>
          <Ingredients
            coffeeGrams={this.state.ingredients.coffee}
            waterGrams={this.state.ingredients.water}
          >
          </Ingredients>
        </main>
      </div>
    );
  }
}

const CupInput = ({value, onChange, onSubmit}) =>
        <form onSubmit = {onSubmit}>
          <label>
            Desired Cups:
            <input
              type="text"
              value={value}
              onChange={onChange}
            />
          </label>
          <button type="submit" >
            Submit
          </button>
        </form>

const Ingredients = ({ coffeeGrams, waterGrams }) =>
  <div className="ingredients">
    <div className="coffee">
      {coffeeGrams}
      (g)
    </div>
    <div className="water"> 
      {waterGrams}
      (g)
    </div>
  </div>

export default App;
