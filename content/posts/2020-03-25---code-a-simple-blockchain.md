---
title: Code a Simple Blockchain
date: "2020-03-25T11:50:32.169Z"
template: "post"
draft:
slug: "/posts/code-a-simple-blockchain/"
category: "Development"
tags:
  - "JavaScript"
  - "BlockChain"
  - "NodeJS" 
description: "You may have heard the term block chain before. But do you understand how they work? Let's take a look at the core
concepts by building a simple blockchain."
socialImage: "/media/learncode.jpg"
---

## Prerequisites

This post assumes that you have a recent version of NodeJS installed and you are at least somewhat familiar with
JavaScript.

This post will only cover the raw essentials and will not touch on more advanced concepts like smart contracts, networking, or
distributed mining. It will however demonstrate a Bitcoin style of proof of work.

## Introduction

From Bitcoin, the Inter Planetary File System, or Ethereum apps, if you're a developer who has used the internet in the last
few years, you've probably seen the term blockchain everywhere under the sun. But what is it exactly?

A blockchain can be thought of a lot like a linked list, but with a little extra security. In addition to each block pointing to the next block, there is also a cryptographic signature involved to ensure that once committed to the chain, blocks can not be modified or altered in any way. This ensures the integrity of the data stored within.

Still not really 100%? Well let's take the best approach there is to learning how something works -- Let's built it!

## Getting Started

Let's start by getting our file and folder structure setup by running the following commands:

```terminal
$ mkdir simple-blockchain && cd simple-blockchain
$ npm init -y
$ mkdir src && cd src
```

This will create a new directory, initialize a NPM project within that directory, and then navigate into a newly created src directory.

## A Single Block

The best place for our story to begin is with a single block. Although not all blockchains are based on financial data, thinking of a single block as a single retail transaction with a positive (credit) or negative (debit) charge can be helpful to begin understanding this fundamental building block.

Let's start by creating a file called `block.js` and filling it with the following contents.

```js
class Block {
  constructor(options, previousHash = "", difficulty = 3) {
    this.options = options;
    this.options.nonce = 1;
    this.previousHash = previousHash;
  }
}

module.exports.Block = Block;
```

Let's break this down. The `options` parameter will accept an object containing the details about the transaction being stored in that block, while previousHash will be used to store the hash of the previous block in the chain, and the difficulty will determine the amount of work needed to commit the block to the chain. Difficulty will be expanded on here shortly. You can ignore the nonce value for now for the same reason.

## Hashing a Block

The next step will be to be able to hash the contents of the block to create its cryptographic signature. If you are not super savvy on what this means, no worries, just think of it as a form of encryption where given the same input, the output will always contain the same value or hash. This is the signature that will ultimately allow us to determine if the block has been tampered with.

Let's start by installing a library called CryptoJS that contains the hashing functions we will use and adding its import to the top of our `block.js` file.

```terminal
$ npm install crypto-js
```

```js
const sha256 = require("crypto-js/sha256");
```

Now we can introduce the function that will create a JSON string from the contents of our block and hash that value.

```js
class Block {
  constructor(options, previousHash = "", difficulty = 3) {
    this.options = options;
    this.options.nonce = 1;
    this.previousHash = previousHash;
    this.hash = this.calculateHash(difficulty);
  }

  calculateHash() {
    return sha256(
      JSON.stringify({ ...this.options, previousHash: this.previousHash })
    ).toString();
  }
}
```

Notice that we have also modified the constructor function to contain a call to this new function. The function simply creates a new object that contains both the `options` (transaction data) and previous hash and converts the resulting digest to a string for easy consumption which we then store on the object as `this.hash`.

## Proof of Work

Now we have the ability to create an arbitrary number of blocks, but we are missing one critical piece, proof of work. Proof of work is a mechanism by which a certain amount of work is required to successfully commit the block to the chain. For the sake of this example, we will be borrowing from Bitcoin where the difficulty factor (mentioned earlier) reflects the number of zeros the hash must begin with in order to be stored on the chain.

You may be asking -- if we can't change transactional information and given the same input the hashed output will always be the same, what do we do? This is where the nonce value comes into play. The nonce value is just a random bit of information that does not pertain directly to the block in question and can be manipulated in order to produce a new hash. This process is repeated over and over again until the hash begins with a necessary number of zeros.

Let's add the code to handle this then break it down.

```js
class Block {
  constructor(options, previousHash = "", difficulty = 3) {
    this.options = options;
    this.options.nonce = 1;
    this.previousHash = previousHash;
    this.hash = this.mineBlock(difficulty);
  }

  calculateHash() {
    return sha256(
      JSON.stringify({ ...this.options, previousHash: this.previousHash })
    ).toString();
  }

  mineBlock(difficulty) {
    let hashValue = this.calculateHash();

    let hashSlice = hashValue.slice(0, difficulty);
    let difficultyFactor = "0".repeat(difficulty);

    while (hashSlice !== difficultyFactor) {
      this.options.nonce++;

      hashValue = this.calculateHash();
      hashSlice = hashValue.slice(0, difficulty);
    }

    return hashValue;
  }
}
```

The first change to make note of is that we are no longer calling the calculateHash function in our constructor but instead calling our new mineBlock function.

We start by calling the previous calculateHash function to generate our starting point, majority of this time, this initial hash will not meet the minimum requirements for being added. So we next create a slice of the first N number of characters of the hash and a string containing N number of zeros where in both cases N is equal to the difficulty factor.

We then loop as long as those two values are not matching. Each iteration, we increase the nonce value by 1 before generating a new hash and a new slice for the next round of comparisons. This can sometimes take hundreds of thousands of iterations to generate a sufficient number of preceding zeros. Fortunately for us, modern computers are super fast. :)

## The Blockchain

Now that we have a single block, we can start building up towards an entire blockchain. Create a new file called `blockchain.js` and let's dive into it.

```js
class BlockChain {
  constructor() {
    this.chain = [];

    const block = new Block({
      timestamp: new Date().getTime(),
      total: 0
    });

    this.chain.push(block);
  }

  add(timestamp, total) {
    let block = new Block({ timestamp, total }, this.tail().hash);
    this.chain.push(block);
  }
}

module.exports.BlockChain = BlockChain;
```

In the above, we have two important things happening.

In the constructor, we establish an array that will hold each of our blocks, and then we create an initial block. This is often called the genesis block because it provides the original hash / cryptographic signature that each subsequent block depends upon.

In the add function, we create a new block from our previously created class that accepts a timestamp and a total. This then uses a function we will write momentarily to pull the last item out of the chain and use it's hash as the previous hash for the new block.

## Accessing block items

When we go to add a new block, we need to access the tail or last block in the chain and utilize it's hash. Let's go ahead and create a simple helper function to accomplish this for us. The code for which is pretty self explanatory.

```js
  tail() {
    return this.chain[this.chain.length - 1];
  }
```

## Validating the Chain

The most important step in this process is to be able to validate a chain to ensure that it has not been tampered with. We can do so with the following function:

```js
  validate() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i].calculateHash();

      if (this.chain[i].hash !== current) {
        return false;
      }

      if (this.chain[i].previousHash != this.chain[i - 1].hash) {
        return false;
      }
    }

    return true;
  }
```

This is a longer function, but it's purpose is only two-fold. We start by using a basic for() loop to iterate over each item in our block. For you functional cats, using any form of iteration would be completely fine here.

We then check to ensure that for the current block, the hash still matches what is saved in the block. If the hash has been altered in any way, then the resulting hash will be different alerting us to tampering.

Lastly, we then check the previous hash to ensure that it still matches as well. If either of these conditions fail, we return false, noting that the chain is invalid. Otherwise we return true.

# Wrapping It Up

To test everything out, let's create a file called `example.js` in our main directory (not src) and load it with the following code:

```js
const { BlockChain } = require("./src/blockchain");

// Build blockchain with a few items
let blockchain = new BlockChain();
blockchain.add(new Date().getTime(), 15.55);
blockchain.add(new Date().getTime(), 125.55);
blockchain.add(new Date().getTime(), 145.55);

console.log(JSON.stringify(blockchain, null, 4));

// Validate prior to modifying
console.log(blockchain.validate());

// Modify then re-validate
blockchain.chain[2].options.total = "1644.33";

console.log(blockchain.validate());
```

## Final Code

The final code for this tutorial can be found on [Github](https://github.com/jodylecompte/simple-blockchain);

## Conclusion

That's it! In less than 100 lines of code we have built the basic building blocks of a blockchain and helped develop a greater understanding of the underlying concepts in the process. If you have any suggestions for improvement or any questions about the code, please reach out and let me know.
