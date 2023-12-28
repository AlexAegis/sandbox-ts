export default {};

await (async () => {
	const p = new Promise((resolve) => {
		setTimeout(() => {
			resolve(12);
		}, 1200);
	});
	console.log('a');
	const r = await p;
	console.log('b');
	const r2 = await p;
	console.log('c');
	console.log(r, r2);
})();
// IIFE Immediately Invoked Function Expression
