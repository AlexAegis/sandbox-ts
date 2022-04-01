function getReq() {
	return new Promise((res) => {
		console.log('hello');
		res(Math.random());
	});
}

getReq().then((e) => console.log(e));
getReq().then((e) => console.log(e));
getReq().then((e) => console.log(e));
getReq().then((e) => console.log(e));
