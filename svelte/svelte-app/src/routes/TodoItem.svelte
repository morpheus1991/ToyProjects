<script lang="ts">
	import { onMount } from 'svelte';

	// your script goes here
	export let todo: { text: string; id: string };
	export let todos: { text: string; id: string }[];

	let isModify: boolean = false;
	let text: string = todo.text;
</script>

<!-- markup (zero or more items) goes here -->
{#if todo}
	<li>
		{#if !isModify}
			<div>
				{todo.text}<button
					on:click={() => {
						isModify = true;
					}}>수정</button
				>
			</div>
		{/if}
		{#if isModify}
			<input
				type="text"
				value={text || ''}
				on:keypress={(e) => {
					text = e.currentTarget.value;
				}}
			/>
			<button
				on:click={() => {
					todos = todos.map((item) => (item.id === todo.id ? { ...todo, text } : item));
					console.log(todos);
					isModify = false;
				}}>수정하기</button
			>
		{/if}
	</li>
{/if}

<style>
	/* your styles go here */
</style>
