# Brew Ratio

<!-- add screenshots -->

## Description

Brew Ratio is a coffee recipe calculator that can be used to determine the appropriate amount of ground coffee and hot water (in grams) necessary to make the desired strength and number of servings of brewed coffee.  Alternatively, Brew Ratio can be used to determine the amount of hot water needed to brew the random amount of coffee beans left at the end of the bag.  Currently the app is designed for the pour over brew method specifically.

### Why?  
Sometimes math is hard, especially if no coffee has been consumed yet.  Also, I have been learning the JavaScript library, React, and wanted to create something to help solidify everything I was learning about React.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Demo

The app can be viewed live here: https://rtviner.github.io/brew-ratio/

## Getting Started

1. Fork this repository by pressing the "fork" button in GitHub.  
You should see a copy of the repository in your own GitHub account with "forked" underneath the project name.

2. Next, create a local copy of the repository by pasting the following command into the terminal.

    ```$ git clone https://github.com/rtviner/brew-ratio.git```

3. Switch to the project's directory:

    ```$ cd brew-ratio```

4. Install all the dependencies in package.json (checkout https://github.com/facebook/create-react-app "What's Included?" to see what is included with Create React App):

    ```$ npm install```

5. Finally run the following command to open the app in your browser at http://localhost:3000.

    ```$ npm start```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Folder Structure

```
brew-ratio/
  README.md
  node_modules/
  package.json
  public/
    index.html
    manifest.json
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
 	serviceWorker.js
 ```
+ *index.html*: Contains div#root, the div which all the app components are loaded into.
+ *manifest.json*: Default Create React App Web App Manifest that can be customized to generate a Progressive Web App.

+ *App.css*: CSS styles for the App component.
+ *App.js*: File containing the App component, which contains all other components.  The JSX code for the app.
+ *App.test.js*: Tests for JSX code.
+ *index.css*: The CSS file corresponding to index.js
+ *index.js*: The JavaScript file corresponding to index.html which contains the command to render the App component in the root div.
+ *serviceWorker.js*: Default Create React App Service Worker that can be customized to generate a Progressive Web App.

## To Do

This app is still a work in progress... the following are some ideas for future renditions of Brew Ratio.
- Add a timer and brewing instructions.
- Add an iced coffee option.
- Add different brew methods, AeroPress, French Press, and stovetop espresso makers.
- Allow users to input their own preferred golden ratios for different strengths and save...





