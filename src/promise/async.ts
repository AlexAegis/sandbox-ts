export default {};

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
	async function ten() {
		await Promise.all([sleep(1000), sleep(1700), sleep(42)]);
		return 10;
	}
	console.log(32);
	const t = await ten();
	console.log(3265);

	console.log(t);
})();
