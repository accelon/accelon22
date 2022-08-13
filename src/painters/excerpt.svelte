<script>
import {onMount} from 'svelte'
export let lines;
export let hits;
export let ptk;
export let tofind;
const PAGE_SIZE=10;
let from=0;
$: displayitems=[];
onMount(async ()=>{
	const till=from+PAGE_SIZE;
	const loadlines=lines.slice(from,from+PAGE_SIZE);
	await ptk.loadLines(loadlines);

	displayitems=loadlines.map(line=>{
		return {text:ptk.getLine(line)};
	});
});
</script>
{#each displayitems as item,idx}
<div>{item.text}</div>
{/each}