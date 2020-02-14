function top(fn: any) {
	fn();
}

const he = function() {
	console.log('He ran', this);
};

const she = () => {
	console.log('She run', this);
};

// top(he);
// top(she);

he();
// she();

console.log();
