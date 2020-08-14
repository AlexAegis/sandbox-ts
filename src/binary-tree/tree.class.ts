export class Node<T> {
	public left?: Node<T>;
	public right?: Node<T>;
	public constructor(public value: T) {}

	public invert(): Node<T> {
		return ([this.left, this.right] = [this.right?.invert(), this.left?.invert()]) && this;
	}

	public toString(): string {
		return `[${this.left?.toString() ?? '_'},${this.value},${this.right?.toString() ?? '_'}]`;
	}
}

const b = new Node(1);
const a = new Node(2);
const d = new Node(3);
const c = new Node(4);
const e = new Node(5);

a.left = b;
a.right = c;

c.left = d;
c.right = e;

/*
  A
 / \
B   C
   / \
  D   E
*/

console.log(a.toString()); // [[_,1,_],2,[[_,3,_],4,[_,5,_]]]
a.invert();
console.log(a.toString()); // [[[_,5,_],4,[_,3,_]],2,[_,1,_]]
