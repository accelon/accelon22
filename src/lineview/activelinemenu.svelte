<script>
import ParallelMenu from './parallelmenu.svelte';
import ParallelTexts from './paralleltexts.svelte';
export let seq;
export let line;
export let division;
export let ptk;
export let key;
$: show=false;
$:parallels=division.getParallelWithDiff();

const toggleshow=(e)=>{
	parallels=division.getParallelWithDiff();
	e.stopPropagation();
	show=!show;
}
$: updatecount=0;
const update=()=>{
	show=false;
	updatecount++;
}

</script>
<span class='menu clickable' on:click={toggleshow}>{show?'▸':'▾'}</span>
{#if show}<ParallelMenu {division} {ptk} {seq} {key} {update}/>{/if}
{#key updatecount}
<ParallelTexts {seq} {line} {ptk} {parallels} {updatecount}/>
{/key}
<style>
	.menu {padding-right: 0.4em;}
</style>