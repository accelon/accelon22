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
export let hitcount;
export let from;
export let samechunkline; //all hits in same chunk if not -1
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
$: chunk= samechunkline>-1? ptk.getHeading(samechunkline):null;

</script>

<ExcerptBar {caption} {ptk} {tofind} {last} {seq} {dividx} bind:from {chunk}/>
{#each displayitems as item,idx}
<div>
<ExcerptHeading {seq} {dividx} {...ptk.getHeading(item.line)} hidechunk={!!chunk}/>
<Abridge {...item} {ptk}/></div>
{/each}
