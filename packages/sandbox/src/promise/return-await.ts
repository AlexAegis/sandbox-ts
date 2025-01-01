const sleep = async (duration: number, i: number): Promise<void> => {
	return new Promise((res) => {
		setTimeout(() => {
			console.log('prom 2', duration, i);
			res();
		}, duration);
	});
};

const foo = async (i: number): Promise<void> => {
	return sleep(500, i);
};

const bar = async (i: number): Promise<void> => {
	return await sleep(500, i);
};

Promise.allSettled([bar(1), bar(2), bar(3), bar(4), bar(5), bar(6)]);
Promise.allSettled([foo(7), foo(8), foo(9), foo(10), foo(11), foo(12)]);
