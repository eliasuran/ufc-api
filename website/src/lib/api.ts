const apiUrl = 'http://172.31.25.161:8080/';

export async function fetchApi(endpoint: string, method: 'GET' | 'POST') {
	const res = await fetch(apiUrl + endpoint, {
		method,
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (res.status !== 200) {
		console.log(await res.json());
		return { error: 'Could not fetch', status: res.status };
	}

	const data = await res.json();
	return { data, status: res.status };
}
