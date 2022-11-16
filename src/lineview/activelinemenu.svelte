<script>
import ParallelMenu from './parallelmenu.svelte';
import ParallelTexts from './paralleltexts.svelte';
import {getContext} from 'svelte';
import {get} from 'svelte/store';
export let seq;
export let line;
export let division;
export let ptk;
export let key;
const LV=getContext('LV');

$: show=false;
$: parallels_linediff=division?.getParallelWithDiff();
if (ptk) ptk.parallels=(JSON.parse(get(LV.parallels)))[ptk.name] ||{}; //see ts/store.js::parallels

const toggleshow=(e)=>{
	parallels_linediff=division?.getParallelWithDiff();
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
<ParallelTexts {division} {seq} {line} {ptk} {parallels_linediff} {updatecount}/>
{/key}
<style>
	.menu {padding-right: 0.4em;}
</style>