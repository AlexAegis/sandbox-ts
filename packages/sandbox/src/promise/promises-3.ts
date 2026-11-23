/* eslint-disable unicorn/prefer-await */
export default {};

const p = Promise.resolve(10);

await p
	.then(() => 30) // 10
	.then((r) => {
		console.log(r);
	}); // undefined ??

const p2 = Promise.resolve(20);

await p2.then((r) => {
	console.log(r);
}); // 20
await p2.then((r) => {
	console.log(r);
}); // 20
await p2.then((r) => {
	console.log(r);
}); // 20 ?? but why
