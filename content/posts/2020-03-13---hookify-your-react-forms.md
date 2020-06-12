---
title: Hookify Your React Forms
date: "2020-03-14T20:40:32.169Z"
template: "post"
draft:
slug: "/posts/hookify-your-react-forms/"
category: "Web Development"
tags:
  - "React"
  - "React Hooks"
  - "UI / UX"
description: "Forms can be incredibly difficult to write in React, even ones with minimal requirements. Let's take a look at how to reduce boilerplate and write more robust forms using React hooks and the react-hook-form library."
socialImage: "/media/loginform.png"
---

## Prerequisites

This post assumes that you are comfortable with the basics of ReactJS and React hooks such as `useState`.

We will be writing a little CSS and utilizing Bootstrap so the styling will not be covered in great detail here. Feel free
to use whichever CSS framework or styling you prefer as it will not affect the React portions of this guide.

## The Problem

As the intro suggested, forms can be incredibly complex in React. We lose a lot of what the browser does by default as far as form validations and error reporting which leads to a lot of people writing a large amount of boilerplate.

Usually the problems fall into one of three categories:

### Validation

Without the aformentioned baked-in browser functionality, we are left with writing large amounts of code to do very simple checks and balances such as making sure a form is populated or that an email address matches a valid pattern.

This often leads to a series of conditionals, often nested conditionals that make managing the state of the form more complex.

### Data Handling

Once the user submits, you now need to have access to your data inside you submit handler, right? This often takes one of two shapes:

1. Assigning a reference to each element and then accessing data through those references, often requiring a large number of references to be created at the top of the function to be used later.

2. Creating a controlled component where the value of the inputs is derived by state and each keystroke updates the state of each input, requiring a large number of useState calls or a single JavaScript object that requires frequent cloning of the state to update a single piece on change.

### Error Handling

With buggy validation, comes buggy error reporting where it is not uncommon to have multiple pieces of state toggling error messages off or a more complicated approach of something like an array of errors that must be mapped and rendered into the DOM. This is often handled completely manually and by hand on each input for each set of errors / validation rules.

## The Solution

There are a few libraries that aim to solve this issue and make forms more accessible. We will be looking at [react-hook-form](https://www.npmjs.com/package/react-hook-form) which I recently discovered and fell in love with but another popular option is [Formik](https://www.npmjs.com/package/formik).

These libraries seek to internalize these common issues and give a more declarative approach to building forms in React.

## Getting Started

This project will be bootstrapped using create-react-app and Bootstrap CSS for a little easy styling. If you choose not to use create-react-app, we will be working with a single main App function so you can easily follow along locally with your own boilerplate, or in an online setting like CodePen or CodeSandbox.

Let's get started by creating our project:

```terminal
$ npx create-react-app hookify-form-example
$ cd hookify-form-example
```

There's a little bit going on that we no longer need like our `App.css` file or the logo file, so replace the contents of `App.js` with the following code:

```jsx
import React from "react";

function App() {
  return <div className="App"></div>;
}

export default App;
```

We want to leave the `index.css` being loaded into our `index.js` file as we will utilize this for a little bit of custom CSS as well.

## Install and Setup Bootstrap

Next up, we want to have something pleasing to look at while not spending a lot of time writing CSS so we will install the Bootstrap framework to handle that for us.

```terminal
# Yarn
$ yarn add bootstrap

# NPM
$ npm install bootstrap --save
```

Next, we'll add the Bootstrap import to the top of our `App.js` file.

```js
import "bootstrap/dist/css/bootstrap.min.css";
```

## Base Styling

Open the `index.css` file from your project root and replace it's contents with the following CSS:

```css
html,
body,
#root {
  height: 100%;
}

body {
  background-color: grey;
}

#root {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #4b79a1;
  background: -webkit-linear-gradient(to bottom, #283e51, #4b79a1);
  background: linear-gradient(to bottom, #283e51, #4b79a1);
}
```

In short, this will give us a beautiful gradient background made available by [uiGradients](https://uigradients.com/#DarkSkies) and center our content in the absolute center of the page.

## A Basic Form

The next step will be for us to build a basic login form. We will be using the default Bootstrap form example for this, you can now replace your App function inside `App.js` with the following code:

```js
function App() {
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Login</h5>
          <form>
            <div className="form-group">
              <label for="email">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
```

Let's go ahead and also add an object to the top of our file that contains the valid username and password. Please note, this is not the way you want to handle authentication in production apps. We are only doing this to allow for a simple check and response handling on the form submission.

```js
const loginInfo = {
  username: "username@test.com",
  password: "testtest"
};
```

## Install react-hook-form

If you've built forms in React before, you may be having some questions now. How are we going to make the magic happen? How is error reporting and validation going to work? Let's start by finally installing react-hook-form.

```terminal
# Yarn
yarn add react-hook-form

# NPM
$ npm install react-hook-form --save
```

We can then import the `useForm` hook from `react-hook-form` into our `App.js` file.

```js
import { useForm } from "react-hook-form";
```

Next up, we'll call our hook and de-structure off the functions that we need to give our form it's power. Add the following in your `App` function above your return statement.

```js
const { register, handleSubmit, errors } = useForm();

const onSubmit = data => {
  console.log(data);
};
```

We get three items off of the hook which are as follows:

- register - Used to register both references to each input, and also apply validation rules. More on this shortly.

* handleSubmit - A higher order function that will be used to wrap the above onSubmit function and pass in the requested data from each form input
* errors - An object that will contain any errors based on registered validation that will be used to handle error reporting.

## Registering Form Inputs

If you have ever used references for your form input, then the following will seem very familiar. The main difference with this approach that I love and hope you do as well is that you avoid two very large drawbacks.

- You don't have to create a unique reference, ie `React.createRef` for each input as the register function will be re-used for all form inputs
- You don't have to manually touch each reference to read the inputs value as the library will handle that for you in the backend.

We will now need to add a reference calling out to `register` on each of our inputs.

```jsx
<form>
  <div className="form-group">
    <label for="email">Email address</label>
    <input
      type="email"
      className="form-control"
      name="email"
      placeholder="Enter email"
      ref={register({ required: true })}
    />
  </div>
  <div className="form-group">
    <label for="password">Password</label>
    <input
      type="password"
      className="form-control"
      name="password"
      placeholder="Password"
      ref={register({ required: true })}
    />
  </div>
  <button type="submit" className="btn btn-primary">
    Submit
  </button>
</form>
```

Let's take a quick dive into this. The register function not only provides the means to watch for the values of the input, but is also where we register any sort of form validation that may be being used. In this case, we are simply marking them as required. `react-hook-form` supports all of the previous HTML5 validation rules such as patterns, max length, or minimum length. You can find a full list [here](https://react-hook-form.com/get-started#Applyvalidation).

The last step before we move on will be to wrap our submit function in the `handleSubmit` function provided by the library and attach it to our form. In your App function, replace your opening `<form>` with the following:

```
<form onSubmit={handleSubmit(onSubmit)}>
```

## Sanity Check

We've been making changes to the same small portion of code over and over which can get a little confusing in a text tutorial, for sanity's sake, let's take a moment to verify that our App function now looks like this:

```js
function App() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Login</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label for="email">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                ref={register({ required: true })}
              />
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                ref={register({ required: true })}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
```

At this point, if you populate the field and submit, you should see the following logged to your console.

```
Object { email: "test@test.com", password: "test" }
```

## Error Handling

Let's now revisit the `errors` object that we de-structured off of our original `useForm` call and add a little error handling into our form.

One piece that was reflected in the code but not mentioned explicitly is that all form inputs must have a name. This becomes important now because the name is how you will check the errors object to verify if an error has been encountered. We will now add a little error reporting check under each input to reflect if the form has been left un-populated.

So taking a look at the property `errors.email` for example will let us know if there has been an error associated with the field named email, likewise for our password field and `errors.password`.

We will now add the following code under our email input:

```jsx
{errors.email && (
  <div className="text-danger">Email is a required field</div>)}
)}
```

And under our password input:

```jsx
{errors.password && (
  <div className="text-danger">Password is a required field</div>)}
)}
```

Try submitting a blank form and you should now see the error messages placed appropriately.

As a final checkpoint, your `App` function should now look like this:

```jsx
function App() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Login</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label for="email">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                ref={register({ required: true })}
              />
              {errors.email && (
                <div className="text-danger">Email is a required field</div>
              )}
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                ref={register({ required: true })}
              />
              {errors.password && (
                <div className="text-danger">Password is a required field</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
```

## The Form Handler

We'll be keeping this super simple and simply showing an alert message based on our information from earlier. Replace the `onSubmit` function inside your `App` function with the following:

```js
const onSubmit = data => {
  if (
    data.email === loginInfo.username &&
    data.password === loginInfo.password
  ) {
    alert("Logged in successfully");
  } else {
    alert("Invalid username or password");
  }
};
```

## Source Code

The full source code for this tutorial can be found on [Github](https://github.com/jodylecompte/hookify-form-example).

## Conclusion

Hopefully you are as happy with `react-hook-form` as I was. It's a great library for building both simple and complex forms and minimizing the amount of boilerplate and ceremony required to do it. If you have any questions or comments, please reach out.
