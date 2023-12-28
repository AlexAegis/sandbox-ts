export const w = (firstName: string) => (lastName: string) => (age: number) => {
	console.log(firstName, lastName, age);
};

w('John')('Wick')(41);

export function api(fN: string, lN: string, age: number) {
	console.log(fN, lN, age);
}

export function m() {
	const fn = 'George';
	const deferredStuff = (ln: string, age: number) => {
		api(fn, ln, age);
	};
	return deferredStuff;
}

export function multiply(a: number, b: number): number {
	return a * b;
}

export function doubleWrap(a: number): number {
	return multiply(2, a);
}
export function tripleWrap(a: number): number {
	return multiply(3, a);
}

export const multiplicationFactory = (a: number) => (b: number) => multiply(a, b);

export const double = multiplicationFactory(2);
export const triple = multiplicationFactory(3);

console.log(double(4));
