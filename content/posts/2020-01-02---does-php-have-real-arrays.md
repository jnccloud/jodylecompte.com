---
title: Does PHP Have Real Arrays?
date: "2020-02-02T19:50:32.169Z"
template: "post"
draft:
slug: "/posts/does-php-have-real-arrays/"
category: "Web Development"
tags:
  - "PHP"
description: "One of the strangest interview questions I've ever gotten was 'Does PHP have real arrays?'. Does it? I don't think they're fake, I remember thinking. Let's peel back the layers on this deceptive, but thoughtful question."
socialImage: "/media/phparray.png"
---

## The Question

I was a junior developer, taking an evaluation interview of sorts with a new IT Director to give them an opportunity to get to know me and assess my ability first hand. I'm a horrible interviewer and I was an even terrible coder back then, but one question still sticks with me having led me to learn some interesting facts about my language of choice and computer science in general.

<blockquote>Does PHP have real arrays?</blockquote>

Real arrays? What does that even mean? Of course they're real. They're not imaginary! I failed the question by saying "yes", but before we can understand why. Let's start by establishing some vocabulary.

## Real Array

The term "real array" in and of itself can confuse even an experienced PHP developer because what exactly does it mean? You may have clicked this post specifically on the passing thought of "What the devil does that mean?"

A less confusing way to ask would might have been:

<blockquote>Are arrays in PHP implemented the same way as arrays in C/C++?</blockquote>

But this does require the programmer also be familiar with C/C++ which is becoming more and more a rarity in web development circles which is likely why the original phrasing became as it is.

For those not familiar, in this case, he was referring to how an array in C is series of blocks in memory that have some very specific characteristics:

- The blocks are in order
- The size of the array is dictated at creation and cannot be changed
- Each block is the same size depending on the datatype it contains
- An array can only contain one type of data

## PHP Arrays

So if you're experienced with PHP, but didn't already know the answer to this question, you probably do now.

PHP arrays under the hood are actually an ordered map under the hood which is what gives them the flexibility us PHP developers should all be grateful for.

They can behave as a numerically indexed array which might also be called a list or a vector:

```php
$array = ['zero', 'one', 'two', 'three'];
echo($array[3]); // three
```

They can be an associative array or what you may hear called a hash map or key value pair.

```php
$array = [
    "fruit" => "Apple",
    "veggie" => "Lettuce"
];
echo($array['fruit']); // Apple
```

They can even be three-dimensional:

```php
$array = [
    "fruits" => ['apple', 'orange', 'banana'],
    "veggies" => ['lettuce', 'spinach', 'asparagus'],
];
echo($array['fruits'][0]); // apple
```

## Broken Rules

To summarize, PHP arrays do not meet our original definition of a "real array" for the following reasons:

- Each item in the array does not occupy a contiguous block of memory, bordering the previous item and next item
- Arrays automatically re-size as you add items dynamically, contrasted against needing to allocate a new, larger array and copy items over from previous array
- Arrays can contain any combination of data types, meaning each block is not necessarily the same size

PHP arrays do maintain the order of items inserted.

```php
$array = [];

$array[3] = 'hello';
$array[2] = 'hello';

print_r($array); [3 => 'hello', 2 => 'hello']
```

This example also demonstrates that while they may appear to be a numerically indexed array, under the hood it is actually a key-value pair using numeric indexes as the key.

## Conclusion

This was definitely one of the more interesting, albeit frustrating, interview questions I have gotten. It led me to learn some new things about PHP internals that I was unaware of. You likely already were familiar with PHP array behavior, but hopefully you've learned a little more about how they work under the hood.
