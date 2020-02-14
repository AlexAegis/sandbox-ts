const arr = [1, 2, 3];

const arr2 = [...arr, 4, 5, ...arr];

console.log(arr2);

function asdf(a: number, b: number) {
	console.log(a, b);
}

const numtup: [number, number] = [1, 2];
asdf(...numtup);
