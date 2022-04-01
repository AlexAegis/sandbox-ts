export default {};

const p = new Promise((res) => {
	res(10);
});

p.then(() => 30) // 10
	.then((r) => console.log(r)); // undefined ??

const p2 = new Promise((res) => {
	res(20);
});

p2.then((r) => console.log(r)); // 20
p2.then((r) => console.log(r)); // 20
p2.then((r) => console.log(r)); // 20 ?? but why
