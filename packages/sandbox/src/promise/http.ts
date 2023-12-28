function getReq() {
	return new Promise((res) => {
		console.log('hello');
		res(Math.random());
	});
}

await getReq().then((e) => {
	console.log(e);
});
await getReq().then((e) => {
	console.log(e);
});
await getReq().then((e) => {
	console.log(e);
});
await getReq().then((e) => {
	console.log(e);
});
