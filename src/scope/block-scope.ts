const a = 'module level\n';

if (true) {
	console.log(a);
	// tslint:disable-next-line: no-var-keyword prefer-const
	var b = 'yo im in a block\n';
	const bl = 'me too but Ill get dropped when my block ends\n';
	console.log(b, bl);
}

{
	// tslint:disable-next-line: no-var-keyword prefer-const
	var c = 'this is still a block\n';
}

console.log(a, b, c);

if (false) {
	// tslint:disable-next-line: no-var-keyword prefer-const
	var d = 'I never get to run with the others..';
}

// console.log(d); // undefined
