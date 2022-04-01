// Closures
// A form of higher order function (A function that either recieves or returns another function)
function callCounterFactory() {
	let counter = 0; // Strictly speaking this part is the closure
	return () => {
		counter++;
		return counter;
	};
}

const callCounter = callCounterFactory();
// the field counter is not accessible
console.log(callCounter());
console.log(callCounter());
console.log(callCounter());
console.log(callCounter());
