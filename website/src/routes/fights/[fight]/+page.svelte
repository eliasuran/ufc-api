<script lang="ts">
	import type { EventData } from '$lib/types';

	export let data: EventData;

	const eventName = data.EventName;
	const mainCardFights = data.MainCard.Fights;
</script>

<div class="flex h-screen flex-col gap-4">
	<h1 class="text-4xl">{eventName}</h1>
	<h2 class="text-3xl">Fights in main card:</h2>
	<div class="flex flex-col gap-2">
		{#each mainCardFights as fightData}
			<div>{fightData.Title}</div>
		{/each}
	</div>
</div>
