<script lang="ts">
	import SportCard from '../components/SportCard.svelte';
</script>

<div class="flex h-full flex-col items-center justify-evenly sm:flex-row">
	<SportCard
		src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UFC_Logo.svg/1600px-UFC_Logo.svg.png"
		alt="ufc logo"
		href="/ufc"
	/>
	<SportCard
		src="https://cdn.freebiesupply.com/images/large/2x/nba-logo-transparent.png"
		alt="nba logo"
		href="#"
		active={false}
	/>
</div>
