<script>
import ParallelMenu from './parallelmenu.svelte';
import ParallelTexts from './paralleltexts.svelte';
import {_,textClasses} from '../ts/textout.ts'
import {getContext} from 'svelte';
import {get} from 'svelte/store';
export let seq;
export let line;
export let division;
export let ptk;
export let key;
export let explainword;
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
{#if explainword}<span class={textClasses(ptk)}>exp {_(explainword,ptk?.lang)} </span>{/if}
<ParallelTexts {division} {seq} {line} {ptk} {parallels_linediff} {updatecount}/>
{/key}
<style>
	.menu {padding-right: 0.4em;}
</style>