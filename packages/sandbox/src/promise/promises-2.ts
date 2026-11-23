export default {};

// eslint-disable-next-line unicorn/prefer-promise-static-methods
const p = new Promise((res) => {
	res(10);
});

console.log(await p); // 10
