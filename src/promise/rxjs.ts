export default {};

import { interval, Observable, Observer, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

const o = new Observable<string>((r) => {
	r.next('Hello');
	r.next('Hello1');
	r.next('Hello2');
});

o.subscribe((v) => console.log(v));

const s = new ReplaySubject<number>(43);

const loggerSubscriber = {
	next: (r) => {
		console.log(r);
	},
} as Observer<unknown>;

interval(100)
	.pipe(
		map((a: number) => a + 2),
		map((a: number) => a + 2),
		map((a: number) => a + 2),
		take(20)
	)
	.subscribe(loggerSubscriber);

s.next(2);
s.next(3);
s.next(4);
