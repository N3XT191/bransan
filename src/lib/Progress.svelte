<script>
	import { onMount } from 'svelte';
    import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

    export let title, percentage;

    const progress = tweened(0, {
		duration: 1000,
		easing: cubicOut
	});
    progress.set(0);

    onMount(() => {
        progress.set(percentage);
	});
</script>

<div class="progress">
    <div class="progress-title">{title}</div>
    <div class="progress-container">
        <div class="progress-total">
            <div
                class="progress-filled"
                style={"width: " + $progress.toString() + "%"}
            />
        </div>
        <div class="progress-percentage">{percentage}%</div>
    </div>
</div>

<style>
    /* These are styled in the global.css file */
</style>
