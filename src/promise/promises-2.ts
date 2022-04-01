export default {};

const p = new Promise((res) => {
	res(10);
});

p.then((r) => console.log(r)); // 10
