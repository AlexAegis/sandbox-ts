export class MyClass {
	myField = 12;

	normalFieldFunction = function (this: MyClass) {
		console.log(this);
	};

	arrowFieldFunction = () => {
		console.log(this);
	};

	normalFunction(): void {
		console.log(this);
	}
}

const mc = new MyClass();

mc.normalFunction();
mc.normalFieldFunction();
mc.arrowFieldFunction();
// in the case of classes every one of them produces the same type of object

// eslint-disable-next-line unicorn/no-this-outside-of-class
console.log(this);
