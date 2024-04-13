<script lang="ts">
	import type { EventData } from '$lib/types';

	export let data: EventData;

	const eventName = data.EventName;
	const mainCardFights = data.MainCard.Fights;
</script>

<div class="flex flex-col gap-4">
	<h1 class="text-4xl">{eventName}</h1>
	<h2 class="text-3xl">Main card:</h2>
	<div class="flex flex-col gap-2">
		{#each mainCardFights as fightData}
			<div class="flex w-full flex-col items-center">
				<h2 class="text-lg">{fightData.Title.split('Bout')[0] + 'Bout'}</h2>
				<div class="flex w-full justify-around">
					<div>
						<p>{fightData.Fighter1.Name}</p>
						<p class="text-sm">{fightData.Fighter1.Country}</p>
					</div>
					<p>vs</p>
					<div>
						<p>{fightData.Fighter2.Name}</p>
						<p class="text-sm">{fightData.Fighter2.Country}</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
