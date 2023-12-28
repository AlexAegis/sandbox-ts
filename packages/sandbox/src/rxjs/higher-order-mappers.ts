import { Observable, Subject, forkJoin, interval, merge, of, timer } from 'rxjs';
import {
	concatMap,
	exhaustMap,
	mapTo,
	mergeMap,
	startWith,
	switchMap,
	takeUntil,
} from 'rxjs/operators';

const emitNowAndWhenExpired = (time: number): Observable<boolean> => {
	// If already expired, just return that
	return time - Date.now() < 0
		? of(true)
		: // If not, return that is not and a timer that will emit when it does
			merge(of(false), timer(new Date(time)).pipe(mapTo(true)));
};

const time$ = new Subject<number>();

const isExpiredSwitchMap$ = time$.pipe(switchMap(emitNowAndWhenExpired));

const isExpiredMergeMap$ = time$.pipe(mergeMap(emitNowAndWhenExpired));

const isExpiredExhaustMap$ = time$.pipe(exhaustMap(emitNowAndWhenExpired));

const isExpiredConcatMap$ = time$.pipe(concatMap(emitNowAndWhenExpired));

// This stream will only emit when all 4 completes
const allFinished$ = forkJoin([
	isExpiredSwitchMap$,
	isExpiredMergeMap$,
	isExpiredExhaustMap$,
	isExpiredConcatMap$,
]);

interval(1000)
	.pipe(startWith(-1), takeUntil(allFinished$))
	.subscribe((i) => {
		console.log('time', i + 1);
	});

isExpiredSwitchMap$.subscribe((n) => {
	console.log('switchMap', n);
});
isExpiredMergeMap$.subscribe((n) => {
	console.log('mergeMap', n);
});
isExpiredExhaustMap$.subscribe((n) => {
	console.log('exhaustMap', n);
});
isExpiredConcatMap$.subscribe((n) => {
	console.log('concatMap', n);
});

// A little delay to make sure the time logs appear before others
setTimeout(() => {
	time$.next(Date.now() + 3000);

	// Wait a second and then send in a 4 second time, then complete the subject
	// signaling that no more values will be emitted
	setTimeout(() => {
		time$.next(Date.now() + 4000);
		// the other pipelines will only complete once the source completes.
		time$.complete();
	}, 1000);
}, 100);

/**
 * time 0
 * All four emits the immediate false value, because the returned stream
 * starts with that
 *
 * switchMap false
 * mergeMap false
 * exhaustMap false
 * concatMap false
 *
 * time 1
 * After a second, a new value is added to the subject that will expire at the
 * 5th tick. But only switch and merge emitted. It's because exhaust doesn't
 * care about incoming values until the inner observable is finished! And that
 * timer in there is till ticking for another 2 seconds. Concat does care, but
 * it will get back to it once the first inner observable finished.
 *
 * switchMap false
 * mergeMap false
 *
 * time 2
 * Nothing happened here
 *
 * time 3
 * At the fourth tick, the first timestamp expires, which means the inner
 * observables emit. But only merge, exhaust and concat emitted! It's because
 * switchMap completely thrown away the inner observable as soon as the new
 * value came in. Exhaust did not care about the new value, merge kept both.
 * And concat both emitted the end of the first inner observable, and the
 * start of the second one, because it waited out the end of the first to
 * start with it, concatenating both.
 *
 * mergeMap true
 * exhaustMap true
 * concatMap true
 * concatMap false
 *
 * time 4
 * Nothing happened here
 *
 * time 5
 * And finally at the sixth tick, the new value expired, switch, merge and
 * concat emitted because only they received the new value, exhaust did not
 * emit the expiration of the second value because it was busy with the
 * previous one. Since the second tick happens at a fixed time and not after
 * a delay, the concat emit is here too. While the first two had a 4 second
 * difference between their last two emits, because of this concat only had 2.
 * If it were a fixed amount of delay, like instead of using a Date for the
 * timer, using a number in milliseconds, the final concat emit would be at
 * tick 7.
 *
 * switchMap true
 * mergeMap true
 * concatMap true
 *
 * In conclusion, if we need a pipeline which emits if the current value is
 * the expired one at any given time, while it can be replaced at any time,
 * the correct operator is `switchMap`, so values that are already replace
 * will not emit that they expired.
 */
