---
title: Make a RGB Picker with React Hooks and useReducer
date: "2020-01-04T20:40:32.169Z"
template: "post"
draft:
slug: "/posts/rbg-picker-with-use-reducer/"
category: "Web Development"
tags:
  - "Web Development"
  - "JavaScript"
  - "React"
  - "React Hooks"

description: "A new addition shipped with React Hooks, useReducer is a powerful function that allows you to manage
state with reducers and dispatching changes not too dissimilar from Redux. Learn how it works while building a neat
RGB picker."
socialImage: "/media/rgbpicker.png"
---

## Prerequisites

This post assumes you are familar with React and functional components inside React. Knowledge of React hooks such as `useState` are not required, but beneficial.

This project and final demo will be built inside CodePen. If you would like to follow along in CodePen you can fork this [template](https://codepen.io/jodylecompte/pen/WNbXmgZ) to get started. Feel free to code however you are most comfortable.

I won't be going in-depth into the CSS or actual conversion from RGB to hex so we can focus on the React aspects.

## Introduction

We will be building a simple component that allows you to select a red, green, and blue color value and see the associated
RGB value, hex value, and closest matched name for the selected values. The background color will also change accordingly. Once complete, our project will look like the picture above. All CSS is external to the React so that you can write your own styles if you want to.

As this post excerpt read, the `useReducer` hook in short allows you to manage your state in a consistent manner where all
updates are managed via calling a `dispatch` function that in turn returns the correctly modified state. Developers who are used to Redux will find this extremely familar and hopefully will also find this approach to be much cleaner and simpler. If for no other reason because less code means less code to read, less code to break, and less code to maintain.

## Small Disclaimer

Developers experienced with React Hooks already may have the thought during this article, "Hey, this would be even less code and even simpler if it were just a few `useState` calls instead". I won't disagree with that assessment.

For the use case of this RGB picker, there is not complex or nested application state or state that is depedent on other state which are the main use cases for the `useReducer` hook. This example is intentionally simple in this regard to allow for greater focus on core concepts while also building a fun little afternoon project. Once you understand the pattern, apply where it makes the most sense. Be idomatic.

## A Litle Prep Work

First, let's begin getting our starting point setup by including the following CSS.

```css
html,
body,
#root {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: sans-serif;
}

#root {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
}

input {
  margin: 1.3em 0;
}

.results {
  text-align: center;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
}

.results > div {
  margin-bottom: 1em;
}

sub {
  color: #8f0000;
}
```

If you are using the CodePen template provided earlier, this CSS will be good to go exactly as is. If you are using another method such as create-react-app, CodeSandbox, or GatsbyJS, then you may need to modify what elements are being targeted by the flexbox code to center our component in the middle of the page.

Your starting JavaScript should look something like this.

```js
const { useReducer } = React;

const App = () => {
  return (
    <>
      <div className="box">Component will go here</div>
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

The first line is only required in CodePen, and would instead be one of the following for other setups.

```js
// Common JS
const { useReducer } = require("react");
// ESM
import { useReducer } from "react";
```

## Conversion Helper Functions

This project will be making use of two helper functions for the bread and butter of our conversion functionality. The first of which was found at the following [blog post](https://campushippo.com/lessons/how-to-convert-rgb-colors-to-hexadecimal-with-javascript-78219fdb) because to be entirely honest with you, I had no idea how to convert RGB to Hex before building this project.

```js
const rgbToHex = rgb => {
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return "" + hex;
};
```

The second of which simply calls the above function on all three values to produce our final hex string.

```js
const hexString = (r, g, b) => {
  return "#" + rgbToHex(r) + "" + rgbToHex(g) + rgbToHex(b);
};
```

## Initial State

Just like a class based component, we begin by establishing our initial state. Here I just selected a nice shade of blue selected at random for our starting point. This state will eventually become part of our component when we pass it to the `useReducer` hook, more about that in a little bit.

```js
const initialState = {
  red: "101",
  green: "157",
  blue: "189"
};
```

## What is a Reducer?

Roughly one half of the magic magic comes down to the reducer, but if you've never worked with a library like Redux before, you may be asking yourself "What is a Reducer?!".

A reducer is just a simple function, but it helps to take a step back first. When working with reducers, it's helpful to first thing of your state changes in terms of actions that your user will click and what you might name them. For this app,
the actions the user would take would be to change one of the three values: red, green, or blue. Actions can also contain any number of properties that are necessry to make the state transformation, such as user input.

An action is just a plain JavaScript object, so you can think of it like this:

```js
{
  name: 'CHANGE_RED',
  value: 165
}
```

To come back full circle, the reducer is the bread and butter of `useReducer` that dictates how each action will transform the state, as well as if an action is even valid. The following code should be outside of your React component.

```js
function reducer(state, action) {
  switch (action.type) {
    case "SET_RED":
      return { ...state, red: action.value };
    case "SET_BLUE":
      return { ...state, blue: action.value };
    case "SET_GREEN":
      return { ...state, green: action.value };
    default:
      throw new Error();
  }
}
```

The most common pattern is for your reducer to contain a switch statement that is switching on `action.type`. So in the above reducer we setup cases for each of the three possible actions, or default to throwing an error if an invalid action type is passed.

Each time a reducer is called, it returns back the a completely new state, the initial state is not mutated. This is why in each case, we start our object by using the spread operator to return the entire existing state, then whatever properties we are changing.

```js
return { ...state, green: action.value };
```

## Putting the Reducer to Work

Initializing the state inside your component is a little different with `useReducer`, as is the case with all React hooks.
Modify your app component by adding the additional code below.

```js
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  document.body.style.background = hexString(
    state.red,
    state.green,
    state.blue
  );

  return (
    <>
      <div className="box">Component will go here</div>
    </>
  );
};
```

We start by passing our reducer and our initial state into the `useReducer` function, this returns the state object that is associated with your component and the dispatch function mentioned earlier. As a reminder, this is the function we will call anytime we need to dispatch an action. Appropriate naming, for the win!

We then call our `hexString` helper funtion defined earlier to generate the hex code for our background style. At this point you should see your box in the middle of the screen and you should see the background color set in our initial state.

## Setting Up Our Sliders

At this point, functionality is essentially identical to either a class component or a functional component using `useState`. So we can go ahead and add in our sliders which will be standard HTML5 range inputs with a minimum and maximum range of 0 to 255. Update your return statement as follows:

```js
return (
    <>
      <div className="box">
        <label>Red</label>
        <input
          type="range"
          min="0"
          max="255"
          value={state.red}
        />
        <label>Green</label>
        <input
          type="range"
          min="0"
          max="255"
          value={state.green}
        />
        <label>Blue</label>
        <input
          type="range"
          min="0"
          max="255"
          value={state.blue}
        />
    </>
  );
```

We are using the controlled input pattern where our value is set directly to our state value, and changes to the input value can only be made by modifiying our application state. You should see the inputs set to the areas defined in our initial state.

## Dispatching Actions

Now that we have our inputs, it's time to add a call to our dispatch function in order to modify our state. On each input, we will call the dispatch function with an object essentialy the same as the first example we looked at. Each input should be modified so that it contains the `onChange` property.

```js
<label>Red</label>
<input
  type="range"
  min="0"
  max="255"
  onChange={e => dispatch({ type: "SET_RED", value: e.target.value })}
  value={state.red}
/>
<label>Green</label>
<input
  type="range"
  min="0"
  max="255"
  onChange={e => dispatch({ type: "SET_GREEN", value: e.target.value })}
  value={state.green}
/>
<label>Blue</label>
<input
  type="range"
  min="0"
  max="255"
  onChange={e => dispatch({ type: "SET_BLUE", value: e.target.value })}
  value={state.blue}
/>
```

Like the example, we are setting each action type to a name matching one of the cases found in our reducer, and passing along a value containing the current value of the event targeted input. You should now see changes you attempt to make being reflected in the value of the slider inputs as well as the background color of the page.

## Brief Aside

This wraps up the parts of our applicatio pertaining direclty to `useReducer` and I hope you have some lightbulbs going off for possible use cases where you may want to use reducers in the future (hint: try experimenting with forms). The rest of this
article will just be wrapping up the remaining functionality of the app.

## Showing the Results

What if our user stumbles upon a color they're really fond of? It would be helpful for us to display the RGB value and hex value that has been selected. Let's go ahead and do this now by adding the following code directly beneath our last input.

```javascript
<div className="results">
  <div>
    {hexString(state.red, state.green, state.blue)}
    <br />
    rgb({state.red}, {state.green}, {state.blue})
  </div>
</div>
```

This code is extremely straight forward. We just call our helper method again to give us a hex string to display, and then call our state directly to display the current value in RGB.

## Bonus Points - Color Name

We can also show the color name, or atleast the closest color name using the library [ntcjs](https://www.npmjs.com/package/ntcjs). This will give us the name of the color as well as tell us if the name is an exact match, or the closest match to a names color as possible to the one selected. My understanding is that not 100% of available colors on the web have a color, if this is incorrect, please let me know.

Start by installing the package. If you are working locally in create-react-app or similar, install via NPM and import at top of file, otherwise you can use the following URL in CodePen: `https://unpkg.com/ntcjs@1.1.2/src/ntc.js`

We can consume the library by adding the following code, taken from the documentation to get the name of the current color as well as a boolean value indicating if it's an exact match. It should be placed directly under where we change the background color in our component before the return expression.

```
const nameMatch = ntc.name(hexString(state.red, state.green, state.blue));
colorName = nameMatch[1];
colorIsExactMatch = nameMatch[2];
```

Lastly, we will add another div in our div with the classname of `results` to display this information so that it appears as follows:

```js
<div className="results">
  <div>
    {hexString(state.red, state.green, state.blue)}
    <br />
    rgb({state.red}, {state.green}, {state.blue})
  </div>
  <div>
    {colorName}
    <br />
    <sub>{colorIsExactMatch ? "Exact Match" : "Closest Match"}</sub>
  </div>
</div>
```

## Full Source Code

The full source code can be found on [CodePen](https://codepen.io/jodylecompte/full/qBEPJwg).

## Conclusion

At this point, unless you chose to modify the CSS, you're app should now aestetically be the same as the opening screenshot as well as functionally complete. If you are not seeing background changes or proper information listed, take a look at the source code. If you are stuck, feel free to drop me a line via the contact page.

I hope that you had a lot of fun building along with me and that you understand the `useReducer` hook more than you did before. Still having issues weighing the trade-offs between `useState` and `useReducer`, or just need more reducers in your life? Check out this [great video](https://www.youtube.com/watch?v=Vi_46Io0UZc) by [Kent C Dodds](https://twitter.com/kentcdodds).
