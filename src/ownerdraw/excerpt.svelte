<script>/* 顯示有關鍵字的行*/
import {getContext} from 'svelte';
import Abridge from './abridge.svelte';
import ExcerptBar from './excerptbar.svelte';
import ExcerptHeading from './excerptheading.svelte';
import {makeElementId} from 'ptk'
export let caption;
export let action;
export let name;
export let lines;
export let hits;
export let phraselength;
export let seq;
export let dividx;
export let ptk;
export let last;
export let tofind;
export let from;
export let samechunkline; //all hits in same chunk if not -1
$: displayitems=[] ;
$: name;
const LV=getContext('LV');
let pfrom=from;
async function load(){
	await ptk.loadLines(lines);
	displayitems=lines.map((line,idx)=>{
		const ck=ptk.getHeading(line);
		return {ck, line,text:ptk.getLine(line),  hits:hits[idx], phraselength:phraselength[idx] };
	});
}
const setFrom=()=>{
	if (pfrom==from) return;
	LV.setFrom(dividx,from);
	pfrom=from;
}
const openChunk=(bkid,tagname,id)=>{
	const address=makeElementId('bk',bkid)+'.'+tagname+(parseInt(id)?id:'#'+id);
	LV.insertAddress(address,seq);
}
$: setFrom(from);
$: load(lines);
$: chunk= samechunkline>-1? ptk.getHeading(samechunkline):null;

</script>
<ExcerptBar {caption} {ptk} {tofind} {last} {seq} {dividx} bind:from {chunk} {action}/>

{#each displayitems as item,idx}
<div>
<ExcerptHeading {ptk} {seq} {dividx} {...item.ck}/>
<Abridge {...item} {ptk}/>{#if !chunk}
{'　'+item.ck.id}.<span class='excerptheading clickable'
 on:click={()=>openChunk(item.ck.bkid,item.ck.tagname,item.ck.id)}>{item.ck.caption}</span>
{/if}</div>

{/each}
