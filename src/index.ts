import { merge, NEVER, of, Subject, throwError } from 'rxjs';
import { catchError, endWith, finalize, map, switchMap, tap } from 'rxjs/operators';

const targetSubject = new Subject<string>();

targetSubject
	.pipe(finalize(() => console.log('target finalized')))
	.subscribe(next => console.log('Subject says: ', next));

of('Hello', 'World')
	.pipe(
		tap(str => console.log('source 1 says:', str)),
		switchMap(a => throwError({ hello: '' })),
		catchError(err => {
			console.log('error:', err);
			return of('An error happened in source 1');
		}),
		finalize(() => console.log('source 1 finalized'))
	)
	.subscribe(targetSubject);

of('Bueno', 'Gusto')
	.pipe(
		tap(str => console.log('source 2 says:', str)),
		switchMap(a => throwError({ hello: '' })),
		catchError(err => {
			console.log('error:', err);
			return of('An error happened in source 2');
		}),
		finalize(() => console.log('source 2 finalized'))
	)
	.subscribe(targetSubject);
