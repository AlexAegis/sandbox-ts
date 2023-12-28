/**
 * @param {() => void} fn
 */
function outerFn(fn) {
	fn();
}
/**
 * @this {any}
 */
const innerFn = function () {
	console.log('innerFn', this);
};

const innerArrowFn = () => {
	console.log('innerArrowFn', this);
};

outerFn(innerFn);
outerFn(innerArrowFn);

innerFn();
innerArrowFn();
