<script>
import ParallelMenu from './parallelmenu.svelte';
import ParallelTexts from './paralleltexts.svelte';
import {_,textClasses} from '../ts/textout.ts'
import {getContext} from 'svelte';
import {get} from 'svelte/store';
import {Painters} from '../painters/painters.ts'
import Button from '../comps/button.svelte';

export let seq;
export let line;
export let division;
export let ptk;
export let key;
export let explainword;
export let activelinemenu; //defined by activelinemenu in tag def
const LV=getContext('LV');

$: show=false;
$: parallels_linediff=division?.getParallelWithDiff();
if (ptk) ptk.parallels=(JSON.parse(get(LV.parallels)))[ptk.name] ||{}; //see ts/store.js::parallels

const toggleshow=(e)=>{
	parallels_linediff=division?.getParallelWithDiff();
	e?.stopPropagation();
	show=!show;
}
$: updatecount=0;
const update=()=>{
	show=false;
	updatecount++;
}

</script>
{#each activelinemenu as menuitem}
<svelte:component this={Painters[menuitem.painter]} {seq} {...menuitem.data} {line}/>
{/each}

<Button className='menu clickable' onclick={toggleshow}>{show?'▸':'▾'}</Button>
{#if show}<ParallelMenu {division} {ptk} {seq} {key} {update}/>{/if}
{#key updatecount}
{#if explainword}<span class={textClasses(ptk)}>{_(explainword,ptk?.lang)} </span>{/if}
<ParallelTexts {division} {seq} {line} {ptk} {parallels_linediff} {updatecount}/>
{/key}
<style>
	.menu {padding-right: 0.4em;}
</style>