import React, { Component } from 'react';
import './App.css';

const DefaultCups = 2;
const DefaultRatio = 15.5;

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
    this.setState({ cups: event.target.value });
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
            <CupInput 
              value={cups}
              onChange={this.onSubmitChange}
              onSubmit = {this.onCupsSubmit}
            >
            </CupInput>
          </div>
          <Ingredients
            coffee={coffee}
            water={water}
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
            Desired 10oz Cups:
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

const Ingredients = ({ coffee, water }) =>
  <div className="ingredients">
    <div className="coffee">
      {coffee}g coffee (ground)
    </div>
    <div className="water"> 
      {water}g water
    </div>
  </div>

export default App;
