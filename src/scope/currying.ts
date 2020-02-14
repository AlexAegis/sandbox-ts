import { getHeapSnapshot } from 'v8';

const w = (firstName: string) => (lastName: string) => (age: number) => console.log(firstName, lastName, age);

w('John')('Wick')(41);

function api(fN: string, lN: string, age: number) {
	console.log(fN, lN, age);
}

function m() {
	const fn = 'George';
	const deferredStuff = (ln: string, age: number) => api(fn, ln, age);
}

function multiply(a: number, b: number): number {
	return a * b;
}

function doubleWrap(a: number): number {
	return multiply(2, a);
}
function tripleWrap(a: number): number {
	return multiply(3, a);
}

const multiplicationFactory = (a: number) => (b: number) => multiply(a, b);

const double = multiplicationFactory(2);
const triple = multiplicationFactory(3);

console.log(double(4));
