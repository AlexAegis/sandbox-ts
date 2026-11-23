export default {};

let a = 10;

setTimeout(() => {
	console.log(30);
	// eslint-disable-next-line unicorn/no-top-level-assignment-in-function
	a = 30;
	return 30;
}, 1000);

console.log(a);
console.log('Hello world');
