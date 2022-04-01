/**
 * Simple solution
 */
export const fizzBuzz = (until = 100): void => {
	const toFizzBuzz = (i: number): number | string => {
		const t = i % 3 === 0;
		const f = i % 5 === 0;
		if (t && f) return 'FizzBuzz';
		else if (t) return 'Fizz';
		else if (f) return 'Buzz';
		else return i;
	};
	for (let i = 0; i <= until; i++) {
		console.log(toFizzBuzz(i));
	}
};

fizzBuzz();
