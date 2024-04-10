<script lang="ts">
	import type { Events } from '$lib/types';

	export let data: Events;

	const events = data.Events;
</script>

<div class="flex flex-col gap-4">
	<h1 class="text-4xl">Upcoming fights</h1>
	{#each events as eventData}
		<div class="flex flex-col">
			<div class="flex text-lg">
				{eventData.Fighter1} vs {eventData.Fighter2}
			</div>
			<div class="text-sm">
				{eventData.Date} | {eventData.Time} | {eventData.Card}
			</div>
			<a href={`/fights/${eventData.ID}`} class="underline">More info</a>
		</div>
	{/each}
</div>
