const makeRule =
	(condition: (i: number) => boolean, result: string) =>
	(i: number): string =>
		condition(i) ? result : '';

/**
 * Expandable solution
 */
export const fizzBuzz = (until = 100): void => {
	const rules = [makeRule((i) => i % 3 === 0, 'Fizz'), makeRule((i) => i % 5 === 0, 'Buzz')];

	const applyRules = (i: number): string | number =>
		rules.reduce((acc, rule) => acc + rule(i), '') || i;

	for (let i = 0; i <= until; i++) {
		console.log(applyRules(i));
	}
};

// eslint-disable-next-line unicorn/prefer-module
if (require.main === module) fizzBuzz();
