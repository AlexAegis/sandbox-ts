import { multicast, of, refCount, Subject } from 'rxjs';

const o1 = of(1, 2, 3);

const o2 = o1.pipe(
	multicast(() => new Subject()),
	refCount(),
);

o2.subscribe((n) => {
	console.log(n);
});
