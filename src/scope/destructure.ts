import { of } from 'rxjs';
import { map } from 'rxjs/operators';

type AxisWithCoord = ['Z' | 'Y' | 'X', number, number];

const tup: ['Z' | 'Y' | 'X', number, number] = ['Y', 1, 2];
tup[0] = 'Z';

const [axis, x, y] = tup;
console.log(axis, x, y);

function dest([axis, x, y]: AxisWithCoord) {
	console.log(axis, x, y);
	axis = 'X';
}

dest(tup);

const obj = {
	aa: 1,
	bb: 2,
	cc: 3,
};

// const { aa, bb, cc } = obj;

of(obj)
	.pipe(map(({ aa }) => aa))
	.subscribe((a) => console.log(a));
