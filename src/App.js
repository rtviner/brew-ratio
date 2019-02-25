import React, { Component } from 'react';
import './App.css';

const DefaultCups = 2;
const DefaultCoffee = 36;
const DefaultWater = 560;
const DefaultRatio = 15.5;
const CoffeeGrindsLabel = "g ground coffee";
const CupsLabel = "10oz servings";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goldenRatio: DefaultRatio, 
      cups: DefaultCups,
      coffee: DefaultCoffee,
      water: DefaultWater, 
      error: null,
      coffeeLow: 'no',
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
    const { cups, coffee, water, coffeeLow } = this.state;

    return (

      <div className="App">
        <header className="App-header">
          <h1>Brew Ratio</h1>
        </header>

        <main>
        <h2>Desired Brewed Coffee:</h2>

          <div className="coffeeOrCupsInput">
 
            <form className="CupGrindInput">
              <ButtonInput
                id="yes"
                name="coffeeLow" 
                value="coffee(g)"
                onClick={this.onClick}
              />
              <ButtonInput 
                id="no"
                name="coffeeLow"
                value="cups(10oz)"
                onClick={this.onClick}
              />
              </form>
          </div>

          { (coffeeLow === 'ground coffee')
            ? <div className="grindsInput">
                <div className="interactions">
                    <CupGrindInput 
                      id="coffeeInput"
                      name='coffee'
                      onChange={this.onClick}
                      onSubmit = {this.onSubmitCoffee}
                    >
                    </CupGrindInput>
                  
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
                    <CupGrindInput 
                      id="cupsInput"
                      name='cups'
                      onChange={this.onClick}
                      onSubmit = {this.onSubmitCups}
                    >
                    </CupGrindInput>
                </div>

                <Ingredients
                  coffee={coffee}
                  water={water}
                  label={CoffeeGrindsLabel}
                >
                </Ingredients>
              </div>
            } 

          <div className="strengthInput interactions">
            <h2>Coffee:1g Water</h2>
            <form> 

              <div class="strength"> 
                  <ButtonInput 
                    id="light"
                    name="goldenRatio"
                    value="18"
                    onClick={this.onClick}
                  />
                <label class="strength" htmlFor="light">light</label>
              </div>

              <div class="strength">
                <ButtonInput 
                  id="med"
                  name="goldenRatio"
                  value="15.5"
                  onClick={this.onClick}
                />
                <label class="strength" htmlFor="med">medium</label>
              </div>

              <div class="strength">
                <ButtonInput
                  id="strong"
                  name="goldenRatio"                
                  value="13"
                  onClick={this.onClick}
                />
                <label class="strength" htmlFor="strong">strong</label>
              </div>

            </form>
          </div>

        </main>
      </div>
    );
  }
}

const CupGrindInput = ({id, name, onChange, onSubmit}) =>
        <form className="CupGrindInput" onSubmit = {onSubmit}>
            <input
              id={id}
              name={name}
              type="number"
              step=".01"
              onChange={onChange}
            />
          <button type="submit" >
            Submit
          </button>
        </form>

const Ingredients = ({ coffee, water, label }) =>
  <div className="ingredients">
    <div className="coffeeOrCups">
      <h2>Ingredients</h2>
      {coffee} {label}
    </div>
    <div className="water"> 
      {water} g water
    </div>
  </div>

const ButtonInput = ({ id, name, value, onClick }) =>
  <span className="button">
    <input
      type="button"
      id={id}
      name={name}
      value={value}
      onClick={onClick}
    />
    
  </span>
   

export default App;
