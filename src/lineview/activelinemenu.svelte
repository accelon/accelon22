<script>
import ParallelMenu from './parallelmenu.svelte';
import ParallelTexts from './paralleltexts.svelte';
import {_,textClasses} from '../ts/textout.ts'
import {getContext} from 'svelte';
import {get} from 'svelte/store';
import {Painters} from '../painters/painters.ts'
import Button from '../comps/button.svelte';
import MediaPlayer from './mediaplayer.svelte'
export let seq;
export let line;
export let division;
export let ptk;
export let key;
export let explainword;
export let activelinemenu; //defined by activelinemenu in tag def
export let linetag;     // tag at the begining of line
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
const getMediaFile=line=>{
	const ck=ptk.nearestChunk(line);
	if (ck.caption.endsWith('.mp3') || ck.caption.endsWith('.mp4')) return ck.caption;
	return ck.caption+'.mp4';
}
</script>
{#each activelinemenu as menuitem}
<svelte:component this={Painters[menuitem.painter]} {seq} {...menuitem.data} {line}/>
{/each}

<Button className='menu clickable' onclick={toggleshow}>{show?'▸':'▾'}</Button>
{#if linetag?.name=="ts"}
<MediaPlayer filename={getMediaFile(line)} ts={linetag.attrs.id} {ptk} {seq} />
{/if}
{#if show}<ParallelMenu {division} {ptk} {seq} {key} {update}/>{/if}
{#key updatecount}
{#if explainword}<span class={textClasses(ptk)}>{_(explainword,ptk?.lang)} </span>{/if}
<ParallelTexts {division} {seq} {line} {ptk} {parallels_linediff} {updatecount}/>
{/key}
<style>
	.menu {padding-right: 0.4em;}
</style>