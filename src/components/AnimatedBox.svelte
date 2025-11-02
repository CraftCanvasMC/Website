<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	let box: HTMLDivElement;

	onMount(() => {
		gsap.to(box, {
			rotation: 360,
			scale: 1.2,
			duration: 2,
			repeat: -1,
			yoyo: true,
			ease: 'power2.inOut'
		});
	});
</script>

<div
	bind:this={box}
	class="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg flex items-center justify-center"
>
	<span class="text-2xl font-bold">GSAP</span>
</div>
