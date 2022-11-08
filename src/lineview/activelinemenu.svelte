<script>
import ParallelMenu from './parallelmenu.svelte';
export let seq;
export let division;
export let ptk;
export let key;
$: show=false;
const toggleshow=(e)=>{
	show=!show;
	e.stopPropagation();
}
//click to display options
// parallel text button, toggle display parallel text 

// save parallel display option state in division(same ptk)

</script>
<span class='menu clickable' on:click={toggleshow}>{show?'▸':'▾'}</span>
{#if show}
	<ParallelMenu {division} {ptk} {seq} {key}/>
{/if}
<style>
	.menu {padding-right: 0.4em;}
</style>