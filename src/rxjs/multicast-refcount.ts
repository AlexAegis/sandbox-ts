import { of, Subject, ConnectableObservable } from 'rxjs';
import { multicast, refCount } from 'rxjs/operators';

const o1 = of(1, 2, 3);

const o2 = o1.pipe(
	multicast(() => new Subject()),
	refCount()
);

o2.subscribe((n) => console.log(n));
