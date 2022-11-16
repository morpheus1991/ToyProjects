<script lang="ts">
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import TodoList from './TodoList.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import TodoItem from './TodoItem.svelte';
	import { v4 as uuidv4 } from 'uuid';
	// let todos = writable<{ text: string }[]>([]);
	let todos: { text: string; id: string }[] = [
		{ id: '12', text: 'ddd1' },
		{ id: '21', text: 'ddd2' }
	];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<input
		type="text"
		on:keypress={(e) => {
			if (e.key === 'Enter') {
				todos.push({ text: e.currentTarget.value, id: uuidv4() });
				todos = todos;
				e.currentTarget.value = '';
			}
		}}
	/>
	<TodoList {todos} />
</section>

<style>
</style>
