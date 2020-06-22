import { of, Subject, ConnectableObservable } from 'rxjs';
import { multicast } from 'rxjs/operators';

const o1 = of(1, 2, 3);

const o2 = new Subject();

o2.subscribe((n) => console.log(n));

o1.subscribe(o2); // like multicast and connect
