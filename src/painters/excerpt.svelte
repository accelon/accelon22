<script>/* 顯示有關鍵字的行*/
import {getContext} from 'svelte';
import Abridge from './abridge.svelte';
import ExcerptBar from './excerptbar.svelte';
import ExcerptHeading from './excerptheading.svelte';
export let caption;
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
$: displayitems=[] ;
$: name;
const LV=getContext('LV');
let pfrom=from;
async function load(){
	await ptk.loadLines(lines);
	displayitems=lines.map((line,idx)=>{
		return {line,text:ptk.getLine(line),  hits:hits[idx], phraselength:phraselength[idx] };
	});
}
const setFrom=()=>{
	if (pfrom==from) return;
	LV.setFrom(dividx,from);
	pfrom=from;
}
$: setFrom(from);
$: load(lines);

</script>

<ExcerptBar {caption} {ptk} {tofind} {last} bind:from/>
{#each displayitems as item,idx}
<div><ExcerptHeading {seq} {dividx} {...ptk.getHeading(item.line)} /> <Abridge {...item} {ptk}/></div>
{/each}
