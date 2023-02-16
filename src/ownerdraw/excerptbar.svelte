<script>
import {makeElementId} from 'ptk'
import {pitakas} from '../ts/store.js'
import {getContext} from 'svelte';
import Button from '../comps/button.svelte';
export let ptk;
export let name;
export let caption;
export let section;
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
{#if $pitakas.length>1}<span title={ptk.humanName()}>{ptk.humanName(true)}</span>{/if}  {#if tofind}<Button onclick={setTofind}>{tofind}</Button>{/if}
{#if caption}<Button onclick={listChunk}>{caption}</Button>{/if}
<span class="ak">{#if section}{ptk.innertext(section)}{/if}{#if hitcount}<span class="hitcount">{hitcount}</span>{/if}
</span>
{#if chunk}
<Button className='excerptheading' onclick={()=>openChunk(chunk.bkid,chunk.tagname,chunk.id)}>{chunk.caption}</Button>
{/if}
<Paging className="excerptpaging" bind:from {last}/>
</div>