export default {};

const p = new Promise(() => {
	return 10;
});

console.log(p);

console.log('Hello?', await p); // what
