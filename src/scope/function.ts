function foo() {
	const l = 'let in function test';
	// tslint:disable-next-line: no-var-keyword prefer-const
	var v = 'lvaret in function test';
	console.log(l, v);
}

foo();

console.log(l, v); // neither of them is available because they are in function scope
