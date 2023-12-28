export default {};

const p = new Promise(() => {
	return 10;
});

console.log(p);

await p.then((r) => {
	console.log('Hello?', r);
}); // what
