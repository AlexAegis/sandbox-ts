import { finalize, ReplaySubject, share, Subject } from 'rxjs';

const source$ = new Subject<number>();

const connector$ = new ReplaySubject<number>(1);
connector$
	.pipe(finalize(() => console.log('Connector Finalized')))
	.subscribe((a) => console.log('Connector emit', a));

source$.next(1);

const shared$ = source$.pipe(
	share({
		connector: () => connector$,
		resetOnError: false,
		resetOnComplete: false,
		resetOnRefCountZero: false, // Try turning this on
	})
);

source$.next(2);

let s1 = shared$.subscribe((n) => console.log('Sub 1:', n));
let s2 = shared$.subscribe((n) => console.log('Sub 2:', n));

source$.next(3);

s1.unsubscribe();
s2.unsubscribe();

source$.next(4);

s1 = shared$.subscribe((n) => console.log('Resub 1:', n));
s2 = shared$.subscribe((n) => console.log('Resub 2:', n));

source$.next(5);

s1.unsubscribe();
s2.unsubscribe();

source$.next(6);
