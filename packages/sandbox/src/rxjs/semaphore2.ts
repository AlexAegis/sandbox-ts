import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, mergeScan, switchMap, take } from 'rxjs/operators';

/**
 * Use to buffer the output based on a semaphore, while its false the operator
 * will buffer all events from the source, and as soon as the semaphore opens
 * by emitting a true it will emit every buffered event, and all subsequent
 * events until the semaphore closes again.
 *
 * TODO: Lift the restiction on the semaphore that it has to be replayable
 *
 * @param source$
 * @param semaphore$ has to be replayable!
 * @returns
 */
export const controlledRelease = <T>(
	source$: Observable<T>,
	semaphore$: Observable<boolean>,
): Observable<T> =>
	source$.pipe(
		mergeScan(
			(acc, value) => {
				const { buffer } = acc;
				return semaphore$.pipe(
					take(1),
					map((semaphore) => {
						return semaphore
							? {
									buffer: [],
									eventsToEmit: [...buffer, value],
								}
							: { eventsToEmit: [], buffer: [...buffer, value] };
					}),
				);
			},
			{ buffer: [] as T[], eventsToEmit: [] as T[] },
			1,
		),
		filter((acc) => acc.eventsToEmit.length > 0),
		switchMap((acc) => acc.eventsToEmit),
	);

// Usage
const source$ = new Observable((observer) => {
	let count = 0;
	const asd = setInterval(() => {
		observer.next(count++);
	}, 1000); // Emit an event every 1000ms
	setTimeout(() => {
		observer.complete();
		clearInterval(asd);
	}, 18_000); // Open semaphore after 15 seconds
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
setTimeout(() => {
	//semaphore$.complete();
}, 18_000); // Open semaphore after 15 seconds
