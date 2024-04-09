<script lang="ts">
	import type { Events } from '$lib/types';

	export let data: Events;

	const events = data.Events;
</script>

<div class="flex flex-col gap-4">
	<div class="text-4xl">Upcoming fights</div>
	{#each events as eventData}
		<div class="flex flex-col">
			<div class="flex text-lg">
				{eventData.Fighter1} vs {eventData.Fighter2}
			</div>
			<div class="text-sm">
				{eventData.Date} | {eventData.Time} | {eventData.Card}
			</div>
			<a href="/" class="underline">More info</a>
		</div>
	{/each}
</div>
