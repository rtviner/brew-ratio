import React, { Component } from 'react';
import { IncrementDecrementSet } from './increment.js';
import { InputButton } from "./inputButton.js";
import './App.css';

const DefaultServings = 2;
const DefaultCoffee = 36;
const DefaultWater = 560;
const DefaultRatio = "15.5";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goldenRatio: DefaultRatio, 
      servings: DefaultServings,
      coffeeGrams: DefaultCoffee,
      waterGrams: DefaultWater, 
      error: null,
    };

    this.setQuantity = this.setQuantity.bind(this);

  }

  setQuantity (event) {
    console.log(event.target);

    // const { servings, coffeeGrams, waterGrams, goldenRatio } = this.state;
    const eventInfo = event.target.id.split("-");
    const name = eventInfo[0];
    const currentQuantity  = this.state[name];

    console.log("eventInfo:", eventInfo, "currentQuantity:", currentQuantity);
  }

// this is used only for golden ratio right now not working for other inputs...
  // onClick(event) {
  //   const target = event.target;
  //   const value = event.target.value;
  //   const name = target.name;
  //   console.log("target:", target, "value:", value, name);

  //   (target.type === 'button')
  //     ? this.setState({ [name]: value })
  //     : (!(value)) //if empty string is submitted set state value to zero***
  //     ? this.setState({ [name]: ""})
  //     : this.setState({ [name]: parseFloat(value)});
  // }

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
  setServings(coffeeGrams, goldenRatio, servingSize = 280) {
    const possibleServings = (coffeeGrams * goldenRatio) / servingSize;
    const roundedPossibleServings = Math.round(possibleServings * 4) / 4;

    this.setIngredients(roundedPossibleServings, goldenRatio);
  }

//this is not being called right now
  setIngredients(servings, goldenRatio, servingSize=280) {   
    const waterGrams = Math.round(servings * servingSize);
    const coffeeGrams = Math.round(waterGrams / goldenRatio);

    this.setState({
        servings: servings,
        coffeeGrams: coffeeGrams,
        waterGrams: waterGrams
    });
  }

  render() {
    const { servings, coffeeGrams, waterGrams, goldenRatio } = this.state;

    return (

      <div className="App">
        <header className="App-header">
          <h1>Brew Ratio</h1>
        </header>

        <main>
          <div id="adjustables">
            <IncrementDecrementSet
              name="servings"
              title="Servings"
              value={`${servings} (oz)`}
              setQuantity={this.setQuantity}
            />
            <IncrementDecrementSet
              name="coffee"
              title="Ground Coffee"
              value={`${coffeeGrams} (g)`}
              setQuantity={this.setQuantity}
            />
            <IncrementDecrementSet
              name="water"
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
