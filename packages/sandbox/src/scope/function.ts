function foo() {
	const l = 'let in function test';
	const v = 'lvaret in function test';
	console.log(l, v);
}

foo();

// console.log(l, v); // neither of them is available because they are in function scope
