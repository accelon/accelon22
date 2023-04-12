<script>/* 顯示有關鍵字的行*/
import {getContext} from 'svelte';
import Abridge from './abridge.svelte';
import ExcerptBar from './excerptbar.svelte';
import ExcerptHeading from './excerptheading.svelte';
import Button from '../comps/button.svelte';

import {makeElementId} from 'ptk'
export let caption;
export let action;
export let name;
export let lines;
export let hits;
export let phraselength;
export let seq;
export let dividx;
export let hitcount;
export let ptk;
export let last;
export let tofind;
export let from;
export let section;//搜尋範圍, ak
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
<ExcerptBar {caption} {ptk} {tofind} {last} {seq} bind:from {chunk} {section} {action} {hitcount}/>
{#each displayitems as item,idx}
<div>

<ExcerptHeading {ptk} {seq} {...item.ck}/>
<Abridge {...item} {ptk}/>{#if !chunk}
<Button className='excerptheading clickable'
 onclick={()=>openChunk(item.ck.bkid,item.ck.tagname,item.ck.id)}>{' '+item.ck.caption}({item.ck.bk?.short})</Button>
{/if}</div>

{/each}
