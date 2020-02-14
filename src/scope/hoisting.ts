export default {}; // this is just for declaring this file as a module
// tslint:disable-next-line: no-var-keyword prefer-const
var x = 5; // Initialize x

const foo = x + ' ' + y; // (lint errors)
console.log(foo); // 5 undefined

// tslint:disable-next-line: no-var-keyword prefer-const
var y = 7; // Initialize y

// tslint:disable-next-line: no-var-keyword prefer-const
var a = 5; // Initialize a
b = 7; // valid because declared in this scope, albeit in a hoisted form
// c = 2; // ReferenceError: c is not defined
const bar = a + ' ' + b; // (no lint errors)
console.log(bar); // 5 7

// tslint:disable-next-line: no-var-keyword prefer-const
var b; // Declare b
