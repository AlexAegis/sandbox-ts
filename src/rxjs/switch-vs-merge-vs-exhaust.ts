import { of, timer, merge, Subject, interval, forkJoin, Observable } from 'rxjs';
import { mergeMap, mapTo, switchMap, exhaustMap, takeUntil, startWith } from 'rxjs/operators';

const emitNowAndWhenExpired = (time: number): Observable<boolean> => {
	// If already expired, just return that
	if (time - new Date().getTime() < 0) {
		return of(true);
	} else {
		// If not, return that is not and a timer that will emit when it does
		return merge(of(false), timer(new Date(time)).pipe(mapTo(true)));
	}
};

const time$ = new Subject<number>();

const isExpiredSwitchMap$ = time$.pipe(switchMap(emitNowAndWhenExpired));

const isExpiredMergeMap$ = time$.pipe(mergeMap(emitNowAndWhenExpired));

const isExpiredExhaustMap$ = time$.pipe(exhaustMap(emitNowAndWhenExpired));

// This stream will only emit when all 3 completes
const allFinished$ = forkJoin([isExpiredSwitchMap$, isExpiredMergeMap$, isExpiredExhaustMap$]);

interval(1000)
	.pipe(startWith(-1), takeUntil(allFinished$))
	.subscribe((i) => console.log('time', i + 1));

isExpiredSwitchMap$.subscribe((n) => console.log('isExpiredSwitchMap', n));
isExpiredMergeMap$.subscribe((n) => console.log('isExpiredMergeMap', n));
isExpiredExhaustMap$.subscribe((n) => console.log('isExpiredExhaustMap', n));

// A little delay to make sure the time logs appear before others
setTimeout(() => {
	time$.next(new Date().getTime() + 3000);

	// Wait a second and then send in a 4 second time, then complete the subject
	// signaling that no more values will be emitted
	setTimeout(() => {
		time$.next(new Date().getTime() + 4000);
		// the other pipelines will only complete once the source completes.
		time$.complete();
	}, 1000);
}, 100);

/**
 * time 0
 * All three emits the immediate false value, because the returned stream
 * starts with that
 *
 * isExpiredSwitchMap false
 * isExpiredMergeMap false
 * isExpiredExhaustMap false
 *
 * time 1
 * After a second, a new value is added to the subject that will expire at the
 * 5th tick. But only switch and merge emitted. It's because exhaust doesn't
 * care about incoming values until the inner observable is finished! And that
 * timer in there is till ticking for another 2 seconds.
 *
 * isExpiredSwitchMap false
 * isExpiredMergeMap false
 *
 * time 2
 * Nothing happened here
 *
 * time 3
 * At the fourth tick, the first timestamp expires, which means the inner
 * observables emit. But only exhaust and merge emitted! It's because switchMap
 * completely thrown away the inner observable as soon as the new value came in.
 * Exhaust did not care about the new value, and merge kept both.
 *
 * isExpiredMergeMap true
 * isExpiredExhaustMap true
 *
 * time 4
 * Nothing happened here
 *
 * time 5
 * And finally at the sixth tick, the new value expired, switch and merge
 * emitted because only they received the new value, exhaust did not emit the
 * expiration of the second value because it was busy with the previous one.
 *
 * isExpiredSwitchMap true
 * isExpiredMergeMap true
 *
 */
