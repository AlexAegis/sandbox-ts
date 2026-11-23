const duration = 500;

const sleep = async (i: number): Promise<void> => {
	return new Promise((res) => {
		setTimeout(() => {
			console.log('prom 2', duration, i);
			res();
		}, duration);
	});
};

const foo = async (i: number): Promise<void> => {
	return sleep(i);
};

const bar = async (i: number): Promise<void> => {
	// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
	return await sleep(i);
};

void Promise.allSettled([bar(1), bar(2), bar(3), bar(4), bar(5), bar(6)]);
void Promise.allSettled([foo(7), foo(8), foo(9), foo(10), foo(11), foo(12)]);
