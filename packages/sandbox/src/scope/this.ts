export class MyClass {
	myField: number;
	constructor() {
		this.myField = 12;
	}

	normalFunction(): void {
		console.log(this);
	}

	normalFieldFunction = function (this: MyClass) {
		console.log(this);
	};

	arrowFieldFunction = () => {
		console.log(this);
	};
}

const mc = new MyClass();

mc.normalFunction();
mc.normalFieldFunction();
mc.arrowFieldFunction();
// in the case of classes every one of them produces the same type of object

console.log(this);
