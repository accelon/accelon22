<script>
import {getContext} from 'svelte';
import ExcerptHeading from './excerptheading.svelte';
export let ptk;
export let name;
export let caption;
export let tofind;
export let from;
export let last;
export let seq;
export let hitcount;
export let dividx;
export let chunk; //show single chunk
import {EXCERPT_PAGESIZE} from 'ptk';
const LV=getContext('LV');
export let pagesize=EXCERPT_PAGESIZE;
const next=()=>{
	if (from+pagesize>=last) return; //is last page
	from+=pagesize;
	if (from>last) from=last-1;
}
const prev=()=>{
	from-=pagesize;
	if (from<0) from=0;
}
const setTofind=()=>{
	LV.setTofind(tofind);
}
const listChunk=()=>{
	const address=name+'=';
	LV.insertAddress(address,seq);
}

</script>

<div class="toolbar excerptheader">
{ptk.humanName()} {#if tofind}<span class="tofind clickable" on:click={()=>setTofind()}>{tofind}</span>{/if} 
{#if caption}<span class="clickable" on:click={()=>listChunk()}>{caption}</span>{/if}
{#if hitcount}<span class="hitcount">{hitcount}</span>{/if}
{#if chunk}
<ExcerptHeading {seq} {dividx} {...chunk} lineoff={0}/>
{/if}
<span class=clickable on:click={prev}>{from+1}/</span><span class='clickable' on:click={next}>{last}</span>
</div>