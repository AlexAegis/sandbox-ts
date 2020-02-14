import { Dog } from './dog';

function rename(doggy: Dog, name: string): Dog {
	const doggyCopy = new Dog(name);
	return doggyCopy;
}

const fido = new Dog('Fido');
console.log(fido);
console.log(fido.bark()); // Fido!
rename(fido, 'Ferdinand'); // Mutate the Dog object, even though it's marked as const
console.log(fido.bark()); // Ferdinand!
