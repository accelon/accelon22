<script>
import {getContext} from 'svelte';
import {textClasses,_} from '../ts/textout.ts';

export let item; // seq 第幾行 , idx 第幾個 division
export let ptk ,lva;
const LV=getContext('LV');
let caption='';
if (item.idx!==-1) caption=ptk?.getHeading(item.line+1).caption; //readable
$: division=lva.getNode(item.idx);
</script>

<span class='rightmenu'>
{#if caption && !division?.singleton}<!-- navigating a reading segment and not singleton division-->
{#if LV.canless(division)}<span class='clickable' on:click={()=>LV.onless(division)}>{"⭱　"}</span>{/if}
{#if LV.canmore(division)}<span class='clickable' on:click={()=>LV.onmore(division)}>{"⭳　"}</span>{/if}
<span class='clickable' on:click={()=>LV.onprev(division)}>{division?.from+1}/</span>
{#if LV.cannext(division)}<span class='clickable' 
on:click={()=>LV.onnext(item.idx)}>{division.last-division.first}</span>{/if}

<span class={'clickable lineviewheading'+textClasses(ptk)} on:click={()=>LV.ontop(division)}>{_(caption,ptk?.lang)}</span>
{/if}
<span class='clickable'on:click={()=>LV.onremove(division)}>⨯</span>
</span>

<style>
	.rightmenu {float: right; padding-right: 0.5em ;user-select: none;}
</style>