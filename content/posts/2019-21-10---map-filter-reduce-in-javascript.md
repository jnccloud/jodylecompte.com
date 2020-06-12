---
title: Map, Filter, and Reduce in JavaScript
date: "2019-10-21T20:40:32.169Z"
template: "post"
draft:
slug: "/posts/map-filter-reduce-in-javascript/"
category: "Web Development"
tags:
  - "JavaScript"
  - "Functional Programming"
  - "Web Development"
description: "Get started with functional programming in JavaScript using these array methods."
socialImage: "/media/mapfilter.jpg"
---

## Prerequisites

This post assumes that you understand the basics of JavaScript and are comfortable with at least one way of running the code examples such as CodePen, CodeSandBox, Repl.it, or a local HTML file.

## Introduction

Functional programming is a heavily debated subject, but what most people will agree on is that it is a
programming paradigm that prioritizes a few principles.

- Pure Functions - Functions that when given the same input will always produce the same output
- Minimizing state and side effects - Side effects are changes in the world as a result of our code such as connecting to a database or writing to a file. By minimizing this as much as possible, we avoid impure functions and added complexity.
- Higher Order / First Class Functions - Functions that can also behave as values and be passed into other functions
- Declarative code - code that says what it is accomplishing rather than the exact logistics of how it's accomplishing it.

Not sure what all this means? That's ok, we'll circle back throughout the article.

## Map, Reduce, Filter

What are map, reduce, and filter? In short, they are functions on the prototype of a JavaScript array and can be used for iterative based operations on a collection of items stored in that array.

They are considered declarative because they do not reveal the means of iteration, nor do they reveal directly the mechanism by which the arrays are being manipulated.

To begin, let's look at the map function.

## Map

Map is a function that iterates over an array and applies a callback function to each member of the array. Does that sound a little like Greek? Maybe a code example will help:

```js
const collection = [1, 2, 3, 4, 5];

const timesTwo = collection.map(item => {
  return item * 2;
});
```

We begin by defining a collection containing some numbers, and then we append the `.map` function to that collection. An important take-away here is that we re-assign the result to the variable `timesTwo`. This is because the functions we discuss in this article do not mutate (or change) the array, but rather return a new array.

As stated above, we do not see how the iteration is happening like we do with a standard `for` loop, and we don't explicitly see how the items are being copied and transformed.

The `.map` function takes our callback function, which multiplies the input by 2, and applies it to each member of our array. The resulting array looking like this:

```js
[2, 4, 6, 8, 10];
```

When we pass a single variable to our callback function, each iteration of the mapping will contain that the next item. However, we can also add a second parameter to get the index of the item.

```js
const collection = [1, 2, 3, 4, 5];

const timesIndex = collection.map((item, i) => {
  return item * i;
});
```

## Filter

The next in our lineup is the filter function, which as the name suggests is used to filter items out of an array based on the callback function we provide.

```js
const collection = [1, 2, 3, 4, 5];

const evenOnly = collection.filter(item => {
  return item % 2 === 0;
});
```

Again we start by defining an array of numbers and then passing a function in as the parameter to `.filter`. Like map, this function accepts a single parameter which is the value of the current item.

Filter will only include items for which the callback function evaluates to true. In the above function we are simply checking that the item is even using the modulus operator. If the item is even, the function returns true and the item is included; otherwise it is excluded. This results in the following array being returned:

```js
[2, 4];
```

A second parameter can be passed in for the index for filter as well.

## Reduce

Reduce is the one you will reach for the least often out of the three listed here, but it is arguably the most powerful for reasons I will soon elaborate on.

Reduce, similar to it's two cousins above, accepts a function with two parameters. The key difference is that reduce is designed to reduce a collection down to a single value such as a sum. As such, the first parameter is the current item while the second is an accumulator that is passed from iteration to iteration.

```js
const collection = [1, 2, 3, 4, 5];

const sum = collection.reduce((acc, item) => {
  acc = acc + item;
  return acc;
});
```

Like map and filter, reduce iterates over each item in the collection. Because of our callback function, each item is added to the accumulator before that accumulator is returned for the next pass. Resulting in a value of 15 being returned.

So what makes reduce so powerful? Reduce also accepts a second parameter that defines the type of the accumulator which could be a number like above, a complex object, or even another array.

Did the lightbulb go off yet? This means we can implement the other two functions in terms of reduce. This is why I make the claim that it is more powerful.

Here is an example of the above code for map, implemented using a reduce

```js
const collection = [1, 2, 3, 4, 5];

const _map = (callback, collection) => {
  return collection.reduce((acc, item) => {
    acc.push(callback(item));
    return acc;
  }, []);
};

const timesTwo = _map(item => {
  return item * 2;
}, collection);
```

That's a little more code than the previous examples. Let's start to break that down. Just as a reminder, you would not want to write a map this way in the real world, this is merely to demonstrate the power of a custom starting value for your accumulator.

We create a function called `_map` which accepts a callback and a collection. We then return the value of calling reduce on that collection. Except this time we push the return value of calling the callback function on the present item to the accumulator which is now an array by means of the second parameter added to reduce.

Our second bit of code simply calls this function and uses an identical callback to the `map` example to build the same array as before.

## Conclusion

We kept the code pretty light today, but hopefully you learned a few new tricks you can use to start making your code more declarative and clean. JavaScript is a language that excels at functional programming, so if you find yourself more interested in that, you'll probably love this deeper dive into [Functional Programming in JavaScript](https://codeburst.io/functional-programming-in-javascript-e57e7e28c0e5) by NC Patro.
