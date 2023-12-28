export default {}; // this is just for declaring this file as a module

const x = 5; // Initialize x

// @ts-ignore
const foo = x + ' ' + y; // (lint errors)
console.log(foo); // 5 undefined

// eslint-disable-next-line no-var
var y = 7; // Initialize y

const a = 5; // Initialize a

b = 7; // valid because declared in this scope, albeit in a hoisted form
// c = 2; // ReferenceError: c is not defined
const bar = a + ' ' + b; // (no lint errors)
console.log(bar); // 5 7

// eslint-disable-next-line no-var
var b; // Declare b
