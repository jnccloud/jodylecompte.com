---
title: Detecting Caps Lock with JavaScript
date: "2019-08-27T21:40:32.169Z"
template: "post"
draft: false
slug: "/posts/detect-capslock-with-javascript/"
category: "Web Development"
tags:
  - "JavaScript"
  - "User Experience"
description: "No one wants to have login issues. Especially when the password being entered is correct but Caps Lock is on! Let's take a look at how a small amount of JavaScript can watch our user's back."
socialImage: "/media/capslock.png"
---

## Prerequisites

This article assumes that you are familiar with the basics of HTML, CSS, and JavaScript. No frameworks, libraries, or advanced techniques are being used for this exercise.

## The Problem

It's far too easy to accidentally hit the caps lock button. Likewise, the only thing more frustrating that having to do a password reset is when you enter your "new password" only to be told you can't use a password you've already used before. Foiled by caps lock again!

Fortunately there's a very easy solution I can show you to make sure you're users are always notified when they've mistakenly entered caps lock.

## The Code

If you want to just dive directly into the code, the completed example pictured above the opening paragraph can be viewed on [Codepen](https://codepen.io/jodylecompte/full/RBZGNq).

## Setup

Whether you are following along in CodePen or your own system, let's start with the HTML code. I won't be reviewing the CSS or HTML as both are just standard as any web form comes.

The important details are that we have attached an ID attribute to the password
input as well as our span under it with our error message. This is being hidden with the `d-none` class being provided by Bootstrap.

```html
<div class="container">
  <form>
    <div class="form-group"
      <label for="username">Username: </label>
      <input
        type="email"
        class="form-control"
        id="username-input"
        placeholder="Enter Username"
      />
    </div>
    <div class="form-group">
      <label for="input-passord">Password: </label>
      <input
        type="password"
        class="form-control"
        id="password-input"
        placeholder="Enter Password"
      />
      <span id="password-caps-warning" class="form-text text-danger d-none"
        >Warning: Caps lock enabled</span
      >
    </div>
    <button type="submit" class="btn btn-success">Submit</button>
  </form>
</div>
</div>
```

Bootstrap is not required for functionality, but helps to make the form a little prettier
so we can move on. You can utilize the link below to load the same version I used from CDN.

```
https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/
4.1.2/css/bootstrap.min.css
```

Now we just need to add a little more custom CSS and we should be well on the way
to looking like the opening example.

```css
body {
  background-color: #009688;
}

.container {
  width: 80%;
  max-width: 600px;
  margin-top: 2em;
  background-color: #e0f2f1;
  padding: 2em;
}

.notice {
  color: #e0f2f1;
  text-align: center;
  margin-top: 2em;
}

.notice a {
  color: #e0f2f1;
  text-decoration: underline;
}
```

Again there is nothing fancy going on here as far as the CSS. We will be using the Bootstrap built-in hidden class to hide or unhide our message; but without Bootstrap, the class could be implemented like this:

```css
.d-none {
  display: none;
}
```

## The JavaScript

The magic sauce of this strategy is the `getModifierState` method located on the KeyboardEvent prototype. This allows us to check on each key press if the caps key was enabled for the last keystroke.

```js
const passwordField = document.getElementById("password-input");
const errorField = document.getElementById("password-caps-warning");

passwordField.onkeydown = function(e) {
  if (e.getModifierState("CapsLock")) {
    errorField.classList.remove("d-none");
  } else {
    errorField.classList.add("d-none");
  }
};
```

The first two lines are simply to assign a reference variable to the two targets mentioned earlier, the password input and its warning message.

We attach an event listener to the password field so we can watch for each keydown. On
the subsequent event, we are able to use the `getModifierState` function to get a true/false response of whether CapsLock was used for a keydown.

It's a very versatile function that can cover a few edge cases, you can read more about it over at [MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState).

## Browser Compatibility

All modern browsers support `KeyboardEvent.getModifierState`, so you should not run into an issues, however, should you need to work on more legacy browsers you do still have options.

One potential option is to check the actual codes in relation to what was pressed. You can check the `shiftKey` property of the KeyBoardEvent prototype to determine if the shift key was pressed. So if you get a capital letter with no shift key being held down, or vic versa, that let's you know the caps lock is currently enabled.

## Conclusion

This is one of those situations where I was hopeful the code would be very easy and it was. Now your users will always know when they've mistakenly used caps lock and you'll probably never have users with login issues again.

Well, maybe that's a bit optimistic ;) But every bit helps!
