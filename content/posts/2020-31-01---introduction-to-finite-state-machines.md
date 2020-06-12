---
title: Introduction to State Machines in React
date: "2020-02-01T15:50:32.169Z"
template: "post"
draft:
slug: "/posts/intro-to-state-machines-in-react/"
category: "Web Development"
tags:
  - "State Machines"
  - "React"
  - "React Hooks"
  - "JavaScript"
description: "First conceptualized many decades ago, a finite state machine is a mathematical model of a machine that as the name suggests, can maintain one of a finite number of states. This idea is generating a lot of buzz in the UI community as an effective way to model our component state. Let's take a look at how we can use state machines in our React apps by building a simple toggle machine."
socialImage: "/media/machine.jpg"
---

## Prerequisites

This most assumes that you are familiar with JavaScript, and React. Only introductory experience with these technologies is required.

Experience with Redux, MobX, or useReducer will be helpful as some concepts are very similar, but it is not required or mentioned in great detail here. Experience with React hooks is also helpful but likewise probably not required.

## Introduction

First conceptualized many decades ago, a finite state machine is a mathematical model of a machine that as the name suggests, can maintain one of a finite number of states. This idea is generating a lot of buzz in the UI community as an effective way to model our component state.

Think about it like your clothes dryer. It exists in one of two states, it is either on or off. It should never be hot or spinning when it is off. You shouldn't be able to turn it off when already off or vic versa. It can only be in one state at a time.

You may already be thinking about how this scenario is very similar to web UI. A hamburger menu like the one we are about to build can either be open or closed. Forms can often be a combination of empty, populated, focused, blurred, and any other maddening combination of complexity.

## State Machines as an Answer

State machines are already a somewhat popular concept in a lot of code, can they also be applicable to user interfaces? I think so. Let's talk about some of the benefits:

- Named States: Every state will have an easily identifiable name that will not only lead to more self documenting code but will help new to project and experienced coders alike easily assimilate the different things a component does.
- Named Actions: Allow you to think in terms of actions that a user is able to take when transitioning from state to state such as a form submit or a specific user click.
- Controlled Transitions: You can (mostly) eliminate bugs involving conflicts around transitions like opening a menu that is already open or submitting a form that is in a submitting / already submitted state.
- Consistent State Management - No more random sampler platter of different ways state is being updated in your app. State transitions would always occur by actions being sent or dispatched in a manner not all to dissimilar from Redux.

## More Complex State

You may be thinking, we've spent a lot time talking about simple toggles, off and on. Software is more complex than this, right?

Absolutely, and state machines and the `xstate` library we'll be using shortly can support this. To return to our dryer analogy, at a high level the machine is really on or off. But it's obviously more complicated than that. The heating element must maintain heat, transitioning between on, warming, and off as needed. The dryer can be in one of several modes such as delicates or high heat which can be thought of as sub states, while the heating element can be modeled as a parallel state.

I won't go into detail in this article, but the sky is the limit in this regard. We will be looking at a finite state machine today and building a simple toggle machine that can either be on or off, but for more advanced use cases you would utilize
other models like a hierarchical state machine or parallel state machine.

## Install Our Dependencies

Aside from the obvious of React and React-Dom, we will also be using the following dependencies:

[Bulma](https://www.npmjs.com/package/bulma) - A bring you own JavaScript based CSS framework to give us a starting point
[@xstate/react](https://www.npmjs.com/package/@xstate/react) - Provides the hook we'll use to consume our machine inside our component
[xstate](https://www.npmjs.com/package/xstate) - For building our state machine, also supports charting

```console
# NPM
$ npm install bulma @xstate/react xstate --save

# Yarn
$ yarn add bulma @xstate/react xstate
```

## Starting Point

Whether you are following along in CodeSandbox or a create-react-app project, the starting point will be the same. We will start with the following example from Bulma's website to give us the familiar hamburger icon to start with.

```jsx
import React from "react";

import "bulma/css/bulma.css";

export default function App() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="#">
          Menu
        </a>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">Home</a>
          <a className="navbar-item">Documentation</a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">Log in</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

We start by importing React, importing the Bulma CSS, and then exporting a functional component.

## Our State Machine

The beginning of the process with using `xstate` is to build out our machine. Machines are composed from a JavaScript object that is passed to a function exposed by the library. Start by adding our additional imports at the top of `app.js`:

```js
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";
```

We will then place the following code directly beneath our imports. This is not required but I find it helpful to have the machine definition at the very top of the file.

```js
const NavMachine = Machine({
  id: "toggleMenu",
  initial: "closed",
  states: {
    opened: {
      on: {
        TOGGLE: "closed"
      }
    },
    closed: {
      on: {
        TOGGLE: "opened"
      }
    }
  }
});
```

Let's break down what's happening here.

First, we give our machine an ID. This is a unique identifier that we simply name toggleMenu. We then dictate that the name of the initial state we want our machine to be in is `closed`. The states property contains a list of our states, two objects that are called "opened" and "closed". The property for initial must match one of the states listed inside this object.

**Quick Aside**: Although our examples have been off and on so far, I want to clarify that a finite state machine does not need to be limited to only two options. A great example mentioned in the `xstate` documentation is a traffic light. The light can only be green, yellow, or red at any given point in time, never more than one. And it will never go from orange to green, or from red to orange. These states are transitioned by the timers or sensors placed under the road.

Each of our state objects also contains an `on` property that contains the list of actions or events that may potentially occur while that state is active. In the case of both of our states, our only action will be to trigger a toggle. Make note that when inside the "opened" state, TOGGLE will set the state to closed, while the opposite is true for the closed status.

This is the state that we will use to actually dictate whether our menu is open or closed.

## Machines Can Be Visualized

While maybe not necessary for such a basic example, one of the awesome selling points of the `xstate` library is that you can take the code we wrote above for our machine and paste it directly, as is, into the [xState visualizer](https://xstate.js.org/viz/) and get a flowchart showing the flow of your states and transitions.

<img src="../../media/statechart.png" />

For more complex machines, this can greatly save your sanity when troubleshooting transition or logistical issues.

## Consuming the Machine

This leads to the magic sauce, if the current state of the machine is also the state of our menu, how do we tie it in so that React is aware of the machine and re-renders when our machine's state changes? This is where the `useMachine` hook provided by `@xstate/react` comes in handy.

Start by adding the following code above the return statement in our main `app` function:

```js
const [state, send] = useMachine(NavMachine);
const navbarClass = "navbar-menu " + (state.value === "opened" && "is-active");
```

If you are familiar with the `useReducer` hook, then `useMachine` works in a very similar way. You pass in your machine and you get back your state object representing the current state of the machine and a function in which to send new actions. I prefer send because this is the convention I see in the documentation, but I have also seen people use `dispatch` as well.

The `navbarClass` is just a helper variable that concatenates on the `is-active` class if the state is set to opened. Notice that `state.value` contains the name of the current state that the machine is in. We now need to apply this class to the the appropriate element. You'll want to find the div layer with the ID of `navbarBasicExample` and change it as such:

```js
<div id="navbarBasicExample" className={navbarClass}>
```

You can now experiment by changing the initial state of the machine from 'closed' to 'opened' and you should see the hamburger menu open. If you are in a full width browser, you will need to shrink the window or enable the browser dev tools mobile emulation.

## Dispatching an Action

The last step is to equip our burger icon to toggle the states of our machine. Locate the `a` with the class of `navbar-burger` and add the following onClick handler.

```js
<a
    role="button"
    className="navbar-burger burger"
    aria-label="menu"
    aria-expanded="false"
    data-target="navbarBasicExample"
    onClick={() => send("TOGGLE")}
>
```

This will dispatch the `TOGGLE` action to the machine, which based on the current state of the machine will either open or close the menu. The button should now be functioning in your demo project.

## Source Code

You can find the full source code at [this](https://codesandbox.io/s/toggle-machine-navbar-047t6) CodeSandBox. If your menu is not working as expected, try to take a look and see what may be different between the two. If you can't figure it out, don't hesitate to reach out to me, I'm happy to help!

## Conclusion

While it's not a perfect solution to every UI use case, I'm a firm believer in state machines and think they have the ability to make our state much more predictable, less error-prone, and easier to understand and visualize with more complex components. Thank you for reading this far and keep checking back for my follow up posts talking about nested state machines and parallel state machines.
