<script>/* 顯示有關鍵字的行*/
import {onMount,getContext} from 'svelte';
import Abridge from './abridge.svelte';
import ExcerptBar from './excerptbar.svelte';
import ExcerptHeading from './excerptheading.svelte';
export let caption;
export let name;
export let lines;
export let hits;
export let phraselength;
export let seq;
export let ptk;
export let end;
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
	LV.setFrom(seq,from);
	pfrom=from;
}
$: setFrom(from);
$: load(lines);

</script>
<!-- todo highlight , abridge text //-->
<ExcerptBar {caption} {ptk} {tofind} {end} bind:from/>
{#each displayitems as item,idx}
<div><ExcerptHeading {seq} {...ptk.getHeading(item.line)} /><Abridge {...item} {ptk}/></div>
{/each}
