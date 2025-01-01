import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { filter, mergeMap, scan } from 'rxjs/operators';

function controlledRelease<T>(
	source$: Observable<T>,
	semaphore$: BehaviorSubject<boolean>,
): Observable<T> {
	// A Subject to capture the source events, allowing them to be buffered or emitted based on the semaphore
	const sourceSubject = new Subject<T>();

	source$.subscribe(sourceSubject);

	return combineLatest([sourceSubject, semaphore$]).pipe(
		// Scan to manage the buffer and determine when to emit based on the semaphore state
		scan(
			(acc, [value, semaphore]) => {
				if (semaphore) {
					// If semaphore is true, prepare all buffered and current events for emission
					const eventsToEmit = [...acc.buffer, value];
					return { buffer: [], eventsToEmit };
				} else {
					// If semaphore is false, buffer the current event
					return { eventsToEmit: acc.eventsToEmit, buffer: [...acc.buffer, value] };
				}
			},
			{ buffer: [] as T[], eventsToEmit: [] as T[] },
		),
		// Only proceed with emissions if there are events to emit
		filter((acc) => acc.eventsToEmit.length > 0),
		// Flatten the events to emit them individually
		mergeMap((acc) => acc.eventsToEmit),
	);
}

// Usage
const source$ = new Observable((observer) => {
	let count = 0;
	setInterval(() => {
		console.log('sending', count);
		observer.next(count++);
	}, 1000); // Emit an event every 1000ms
});

const semaphore$ = new BehaviorSubject<boolean>(false);

const result$ = controlledRelease(source$, semaphore$);
result$.subscribe((x) => {
	console.log(x);
});

// To demonstrate, toggle the semaphore after some delay
setTimeout(() => {
	semaphore$.next(true);
}, 5000); // Open semaphore after 5 seconds
setTimeout(() => {
	semaphore$.next(false);
}, 10_000); // Close semaphore after 10 seconds
setTimeout(() => {
	semaphore$.next(true);
}, 15_000); // Open semaphore after 15 seconds
