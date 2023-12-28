export default {};

const p = new Promise((res) => {
	res(10);
});

await p
	.then(() => 30) // 10
	.then((r) => {
		console.log(r);
	}); // undefined ??

const p2 = new Promise((res) => {
	res(20);
});

await p2.then((r) => {
	console.log(r);
}); // 20
await p2.then((r) => {
	console.log(r);
}); // 20
await p2.then((r) => {
	console.log(r);
}); // 20 ?? but why
