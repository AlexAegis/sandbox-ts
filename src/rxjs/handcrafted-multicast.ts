import { of, Subject, ConnectableObservable } from 'rxjs';
import { multicast, take, delay } from 'rxjs/operators';

const o1 = of(1, 2, 3);

o1.pipe(delay(2000)).subscribe((n) => console.log(n));
