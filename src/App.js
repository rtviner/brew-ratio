import React, { Component } from 'react';
import { IncrementDecrementSet } from './increment.js';
import { InputButton } from "./inputButton.js";
import './App.css';

const DefaultBrewAmt = 20;
const DefaultCoffee = 36;
const DefaultWater = 560;
const DefaultRatio = "15.5";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goldenRatio: DefaultRatio, 
      brewAmount: DefaultBrewAmt,
      coffeeGrams: DefaultCoffee,
      waterGrams: DefaultWater, 
      error: null,
    };

    this.setQuantity = this.setQuantity.bind(this);

  }


  setQuantity (event) {
    const eventInfo = event.target.id.split("-");
    const name = eventInfo[0];
    const currentQuantity  = this.state[name];
    let newQuantity;

    if (eventInfo[1] === "increment" ) {
      newQuantity = currentQuantity + 1;
    }

    if (eventInfo[1] === "decrement" && currentQuantity > 1) {
      newQuantity = currentQuantity - 1;
    }
    this.setState({ [name]: newQuantity });
    //Need to recalculate and update other two quantity states that are not name too
  }

//no longer a submit button

//   onSubmitCoffee(event) {
//     const { coffeeGrams, goldenRatio } = this.state;
//     this.setServings(coffeeGrams, parseFloat(goldenRatio));
//     event.preventDefault();
//   }

// //no longer a submit button
//   onSubmitServings(event) {
//     const { servings, goldenRatio } = this.state;
//     this.setIngredients(servings, parseFloat(goldenRatio));
//     event.preventDefault();
//   }

//this is not being called right now
  setBrewAmount(coffeeGrams, goldenRatio, servingSize = 280) {
    const possibleServings = (coffeeGrams * goldenRatio) / servingSize;
    const roundedPossibleServings = Math.round(possibleServings * 4) / 4;

    this.setIngredients(roundedPossibleServings, goldenRatio);
  }

//this is not being called right now
  setIngredients(brewAmount, goldenRatio, servingSize=280) {   
    const waterGrams = Math.round(brewAmount * servingSize);
    const coffeeGrams = Math.round(waterGrams / goldenRatio);

    this.setState({
        brewAmount: brewAmount,
        coffeeGrams: coffeeGrams,
        waterGrams: waterGrams
    });
  }

  render() {
    const { brewAmount, coffeeGrams, waterGrams, goldenRatio } = this.state;

    return (

      <div className="App">
        <header className="App-header">
          <h1>Brew Ratio</h1>
        </header>

        <main>
          <div id="adjustables">
            <IncrementDecrementSet
              name="brewAmount"
              title="Brew Amount"
              value={`${brewAmount} (oz)`}
              setQuantity={this.setQuantity}
            />
            <IncrementDecrementSet
              name="coffeeGrams"
              title="Ground Coffee"
              value={`${coffeeGrams} (g)`}
              setQuantity={this.setQuantity}
            />
            <IncrementDecrementSet
              name="waterGrams"
              title="Water"
              value={`${waterGrams} (g/mL)`}
              setQuantity={this.setQuantity}
            />
          </div>

          <div className="strengthInput interactions">
            <h2>g Coffee:1g Water</h2>
            <form> 

              <div className="strength"> 
                  <InputButton
                    className = {(goldenRatio === "18") ? "active" : "inactive"} 
                    id="light"
                    name="goldenRatio"
                    value="18"
                    onClick={this.setQuantity}
                  />
                <label className="strength" htmlFor="light">light</label>
              </div>

              <div className="strength">
                <InputButton
                  className = {(goldenRatio === "15.5") ? "active" : "inactive"} 
                  id="med"
                  name="goldenRatio"
                  value="15.5"
                  onClick={this.setQuantity}
                />
                <label className="strength" htmlFor="med">medium</label>
              </div>

              <div className="strength">
                <InputButton
                   className = {(goldenRatio === "13") ? "active" : "inactive"}
                  id="strong"
                  name="goldenRatio"                
                  value="13"
                  onClick={this.setQuantity}
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

export default App;
