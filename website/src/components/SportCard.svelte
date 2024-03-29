<script lang="ts">
	export let src: string;
	export let alt: string;
	export let href = '#';
	export let active = true;
</script>

<a
	{href}
	class="relative grid h-52 w-80 place-items-center p-4 shadow-md shadow-black/25 duration-300 hover:scale-105 sm:h-96"
>
	{#if !active}
		<div
			class="absolute inset-0 grid place-items-center bg-white/80 text-4xl font-semibold italic text-black/25"
		>
			Coming soon
		</div>
	{/if}
	<img {src} {alt} class="max-h-52 sm:max-h-80" />
</a>
