---
title: Best ES6 Features
description: A deep dive into the new ES6 features while comparing and contrasting with ES5
slug: best-es6-features
date: 2016-06-15
---

Javascript is an everchanging language. Each new spec released comes with a myriad of new features, as well as condemning some of the old paradigms we've come to know and love. We've learned to use frameworks and libraries to get around the shortcomings of the language, and many have started their education not learning the javascript language itself, but rather a widely used abstraction layer that will get replaced as the hottest new `xyz` toy comes along.

The ES6 spec has taken a huge step in the right direction as javascript evolves into a more advanced language with aspects pulled from more tenured object oriented languages.

I'd like to delve into a few of the most awesome features I've found useful in my daily javascript programming.

## Blocks
We used to create closures by using Immediately Invoked Function Expressions ([IIFE](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)). With ES6, we can now create blocks which maintain their own scope.

### Before
``` javascript
(function iife() {
  var scopedVar = 'hello world';

  console.log(scopedVar); // output: 'hello world'
})()

console.log(scopedVar) // output: undefined
```

### After
Notice the use of `let` instead of `var`. This is a new keyword in the ES6 spec that declares a block scope local variable.

``` javascript
{
  let scopedVar = 'hello world';

  console.log(scopedVar); // output: 'hello world'
}

console.log(scopedVar) // output: undefined
```

## Object Literals
ES6 allows declaring object literals by providing shorthand syntax for initializing properties from variables and defining function methods. It also enables the ability to have computed property keys in an object literal definition.

``` javascript
function getCar(make, model, value) {
  return {
    // with property value shorthand
    // syntax, you can omit the property
    // value if key matches variable
    // name
    make,  // same as make: make
    model, // same as model: model
    value, // same as value: value

    // computed values now work with
    // object literals
    ['make' + make]: true,

    // Method definition shorthand syntax
    // omits `function` keyword & colon
    depreciate() {
      this.value -= 2500;
    }
  };
}

let car = getCar('Kia', 'Sorento', 40000);

console.log(car.makeKia) // Output: true

```

## Object Destructuring

Before object destructuring, we used to need temporary variables into to store and unwrap particular key-value pairs in an object.

### Before
``` javascript
// Arrays
var arr = [1, 2, 3];
var two = arr[1];

console.log(two) // Output: 2

// Objects
var obj = {
  one: 1,
  two: 2,
  three: 3
};

var two = obj.one;

console.log(two) // Output: 2
```

We now have a shortcut to pluck and assign values to variables directly from arrays and objects themselves;

### After
``` javascript
// Arrays
let arr = [1, 2, 3];
let [one, two, three] = arr;

console.log(two) // Output: 2

// Objects
let obj = {
  one: 1,
  two: 2,
  three: 3
}

const { two } = obj;
console.log(two); // Output: 2

// You can even assign an alias to the new variable to make it more semantic
const { two: numberTwo }
console.log(numberTwo) // Output: 2
```

Destructuring is incredibly useful when you only need to work with particular keys out of an object. It also proves to be very useful when receiving parameters in a function.

## Arrow Functions
Scope is one of the more difficult _concepts_ to grasp when first starting out with javascript. Identifying the current scope and maintaining reference to your desired scope was always a pain. ES6 helps mitigate these issues with arrow functions. Arrow functions inherit the the outer scope, removing the need for us to shadow the outer scope with a temporary variable.

### Before
Seen below, the function passed to set timeout will create a new scope when executed, binding to a new lexical `this`. We need the `_this` to maintain a reference to the outer scope containing our age.

``` javascript
function Person(age) {
  this.age = age;
  var _this = this;

  setTimeout(function () {
    console.log(this.age) // Output: undefined
    console.log(_this.age) // Output: 5
  });
}

var p = new Person(5);
```

### After
Using an arrow function will inherit the current scope.

``` javascript
function Person(age) {
  this.age = age

  setTimeout(() => console.log(this.age)) // Output: 5
}

const p = new Person(5);
```

Arrow functions come with a few other nifty features that I've found to increase the efficiency of my programming.

### Single Arguments
If passing a single argument to an arrow function, parentheses are not required.

``` javascript
let arr = [1, 2, 3];
console.log(arr.map(val => val*2)) // Output: [2, 4, 6]
```

### Destructuring Arguments
Stemming off the prior section on destrucuring objects, you may also do this when receiving parameters in a function. Although I'm using arrow functions here, you may also destructure parameters while using vanilla functions.

``` javascript
// Mimicking a reducer in the Redux library
const reducer = ({type, data, error}) => {
  console.log(type) // Output: 'CREATE_POST'
}

// Some global dispatch function
dispatch({
  type: 'CREATE_POST',
  data: {},
  error: null
});
```

## Default Parameters
Previously, setting default parameters was a verbose and tedious process. We can now assign defaults directly when receiving the argument.

### Before
``` javascript
function add(x, y) {
  x = x || 0
  y = y || 0
  return x + y;
}
```

### After
``` javascript
const add = (x=0, y=0) => x + y;
```

## Template Literals
Concatenating strings was honestly the worst. It was a mish mash of apostrophes and plus signs garbled together to form something that sort of looked like a string. In comes back ticks, the new syntax to define a template literal. They can span multiple lines, removing the myriad of workarounds for multi line string definition and provide easy to read string interpolation

### Before
This syntax is unreadable and hard to maintain, especially when creating extremely dynamic strings.

``` javascript
// Plus operator
var multiLinePlus = 'This is supposed to be a ' +
'multi line string ' +
'and I usually forget the plus operator ' +
'which results in an error'

// Array + Join
var multiLineArray = [
  'This is a multi line string',
  'And I will join these strings together',
  'Using the join method with a space as the delimiter'
].join(' ');

// With a variable
var name = 'Kyle'
var stringWithVar = 'Hello ' + name + ', how are you doing?'
```

### After

Template literals are a godsend for dynamic strings and HTML templates generated on the fly.

``` javascript
const name = 'Kyle'
const multiLine = `
  Ah I can write as mine lines as I want without
  having to add any extra characters to join my strings.
  And string interpolation is so easy. I just need to use dollar sign + braces
  to insert a variable into my string. Who let the dogs out?
  ${name} did.
`
```

## The For-Of loop

Es6 provides a new way for us to iterate over arrays. This combines the power of the original for loop and the forEach Array prototype method. This gives us the current element on each iteration without using an accessor while still allowing us to break out of the loop when necessary.

### Before
``` javascript
var arr = [1, 2, 3];

// For Loop
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i]) // Output: 1, 2, 3
}

// Native forEach method
arr.forEach(function (value, key) {
  console.log(`${key}: ${val}`); // Output: 0: 1, 1: 2, 2: 3
})
```

### After
``` javascript
const arr = [1, 2, 3];

for (const elem of arr) {
  console.log(elem); // Output: 1, 2, 3
}

// Obtaining the keys of the object as well
for (const [key, val] of arr.entries()) {
  console.log(`${key}: ${val}`); // Output: 0: 1, 1: 2, 2: 3
}
```
