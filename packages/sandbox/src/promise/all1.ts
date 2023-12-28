export default {};
console.time('All start');

const p1 = new Promise((res) => {
	setTimeout(() => {
		res('a');
	}, 1000);
});

const p2 = new Promise((res) => {
	setTimeout(() => {
		res('b');
	}, 1500);
});

const p3 = new Promise((res, _rej) => {
	setTimeout(() => {
		res('c');
	}, 2000);
});

console.time('All resolve time');
void Promise.all([p1, p2, p3]).then(([r1, r2, r3]) => {
	console.log(r1, r2, r3);
	console.timeEnd('All resolve time');
});
console.timeEnd('All start');

//  const [r1, r2, r3] = await Promise.all([p1, p2, p3]);
