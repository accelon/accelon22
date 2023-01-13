<script>
import {makeElementId} from 'ptk'
import {pitakas} from '../ts/store.js'
import {getContext} from 'svelte';
export let ptk;
export let name;
export let caption;
export let tofind;
export let from;
export let last;
export let seq;
export let hitcount;
import Paging from '../comps/paging.svelte';
export let chunk; //show single chunk
const LV=getContext('LV');
const setTofind=()=>{
	LV.setTofind(tofind);
}
const listChunk=()=>{
	const address=name+'=';
	LV.insertAddress(address,seq);
}
const openChunk=(bkid,tagname,id)=>{
	const address=makeElementId('bk',bkid)+'.'+tagname+(parseInt(id)?id:'#'+id);
	LV.insertAddress(address,seq);
}
</script>

<div class="toolbar excerptheader">
{#if pitakas.length>1}<span title={ptk.humanName()}>{ptk.humanName(true)}</span>{/if}  {#if tofind}<span class="tofind clickable" on:click={()=>setTofind()}>{tofind}</span>{/if} 
{#if caption}<span class="clickable" on:click={()=>listChunk()}>{caption}</span>{/if}
{#if hitcount}<span class="hitcount">{hitcount}</span>{/if}
{#if chunk}
<span class='excerptheading clickable'
 on:click={()=>openChunk(chunk.bkid,chunk.tagname,chunk.id)}>{chunk.caption}</span>
{/if}
<Paging bind:from {last}/>
</div>