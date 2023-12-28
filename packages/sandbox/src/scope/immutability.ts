export default {}; // this is just for declaring this file as a module

// let - block scoped, let's you redefine it.
let a = 1;
a = 2; // van be redefined
console.log(a); // 2

// const - block scoped, doesn't let you redefine it, lets you mutate it
const b = 1;
// b = 2; // TypeError: Assignment to constant variable.
console.log(b); // 1

const obj = {
	foo: 'A string',
	bar: {
		hello: 124,
	},
};

obj.foo = 'Another string'; // totally valid, only the reference of that object is const

console.log(obj.foo); // Another string

Object.freeze(obj.bar); // force runtime immutability ()
Object.freeze(obj.foo);

obj.foo = 'Noooo'; // TypeError: Cannot assign to read only property 'foo' of object '#<Object>'

interface ReadonlyObjectType {
	readonly c: number;
}

export const readonlyObj: ReadonlyObjectType = {
	c: 12,
};

// Cannot assign to 'c' because it is a read-only property.ts(2540)
// readonlyObj.c = 13; // But it still runs on node as it's only enforced by the typescript compiler
// npx tsc immutability.ts would throw an error
