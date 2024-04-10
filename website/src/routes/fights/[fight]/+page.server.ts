import { fetchApi } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const data = await fetchApi(`fights/${params.fight}`, 'GET');
	if (data.status !== 200) {
		console.log(data.error);
		return {};
	}

	return data.data;
};
