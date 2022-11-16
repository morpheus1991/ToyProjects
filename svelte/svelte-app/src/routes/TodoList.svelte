<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import TodoItem from './TodoItem.svelte';

	// your script goes here
	export let todos: { text: string }[];
	afterUpdate(() => {
		console.log('uo');
		todos = todos;
	});
</script>

<ul>
	<div>dd</div>
	{#if todos}
		{#each todos as todo}
			<TodoItem {todo} {todos} />
		{/each}
	{/if}
</ul>

<!-- markup (zero or more items) goes here -->
<style>
	/* your styles go here */
</style>
