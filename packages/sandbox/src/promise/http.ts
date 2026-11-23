function getReq() {
	return new Promise((res) => {
		console.log('hello');
		res(Math.random());
	});
}

console.log(await getReq());
console.log(await getReq());
console.log(await getReq());
console.log(await getReq());
