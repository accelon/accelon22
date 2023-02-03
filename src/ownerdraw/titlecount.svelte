<script>// see ptk/lineview/titlecountaction.ts
import {getContext} from 'svelte';
import ExcerptBar from './excerptbar.svelte';
import {makeExcerptAddress} from 'ptk'
import {_,textClasses} from '../ts/textout.ts'
import Button from '../comps/button.svelte';
export let caption;
export let name;
export let tofind;
export let items;
export let seq;
export let dividx;
export let ptk;
export let last;
export let from;
export let hitcount;
$: name;
const LV=getContext('LV');
let pfrom=from;

const setFrom=()=>{
    if (pfrom==from) return;
    LV.setFrom(dividx,from);
    pfrom=from;
}
$: setFrom(from);
const newdivision=(address)=>{
    LV.insertAddress(ptk.name+':'+address,seq);
}
const newexcerpt=(chunk)=>{
    const address=makeExcerptAddress(ptk.name,name.slice(1),tofind,'ck'+chunk);
    LV.insertAddress(address,seq);
}
</script>
<ExcerptBar {caption} {ptk} {tofind} {last} {hitcount} bind:from {name}/>
{#each items as item,idx}
<div><Button className={"clickable "+textClasses(ptk)} 
    onclick={()=>newdivision(item.address)}>{_(item.caption,ptk?.lang)}</Button>
    {#if item.count>=0}<Button className='hitcount clickable' onclick={()=>newexcerpt(item.id)}>{'　'+item.count}</Button>{/if}</div>
{/each}
    