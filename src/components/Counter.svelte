<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	let count = $state(0);
	let counterEl: HTMLSpanElement;

	function increment() {
		count++;
		animateCount();
	}

	function animateCount() {
		gsap.fromTo(
			counterEl,
			{ scale: 1.5, color: '#a78bfa' },
			{ scale: 1, color: '#ffffff', duration: 0.3, ease: 'back.out(1.7)' }
		);
	}

	onMount(() => {
		gsap.from(counterEl, {
			scale: 0,
			duration: 0.5,
			ease: 'back.out(1.7)'
		});
	});
</script>

<div class="flex flex-col items-center gap-4 p-6 bg-gray-800 rounded-xl shadow-xl">
	<h2 class="text-2xl font-bold text-purple-400">Svelte Counter</h2>
	<span bind:this={counterEl} class="text-6xl font-bold">{count}</span>
	<button
		onclick={increment}
		class="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-purple-500/50"
	>
		Click me
	</button>
</div>
