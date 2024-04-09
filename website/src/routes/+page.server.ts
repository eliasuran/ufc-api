import { fetchApi } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const data = await fetchApi('fights', 'GET');
	if (data.status !== 200) {
		console.log(data.error);
		return {};
	}

	return data.data;
};
