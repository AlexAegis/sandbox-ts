export default {};

const p = new Promise((res) => {
	res(10);
});

await p.then((r) => {
	console.log(r);
}); // 10
