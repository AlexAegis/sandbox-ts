import { ObjectUnsubscribedError } from 'rxjs';

export default {};
const foo = {
	a: 1,
	obj: {
		b: 3
	}
};

const bar = { ...foo };

console.log(bar);
console.log(JSON.stringify(bar));

foo.a = 10;
foo.obj.b = 12;

console.log(bar);
console.log(JSON.stringify(bar));

console.log();
