module.exports.test = async function () {
	console.log('xpp');
	const res = await fetch('http://localhost:8080/fights', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (res.status !== 200) console.log('error');

	const data = await res.json();
	console.log(data.Events[0]);
};
