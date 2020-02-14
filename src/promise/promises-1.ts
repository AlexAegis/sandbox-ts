export default {};

const p = new Promise(() => {
	return 10;
});

console.log(p);

p.then(r => console.log('Hello?', r)); // what
