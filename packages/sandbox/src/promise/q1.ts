/* eslint-disable unicorn/prefer-await */
function job() {
	return Promise.reject(new Error('job failed'));
}

const promise = job();

await promise
	.then(function () {
		console.log('Success 1');
	})
	.then(function () {
		console.log('Success 2');
	})
	.then(function () {
		console.log('Success 3');
	})
	.catch(function () {
		console.log('Error 1');
	})
	.then(function () {
		console.log('Success 4');
	});
