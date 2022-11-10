<script>
import {getContext} from 'svelte';
export let item; // seq 第幾行 , idx 第幾個 division
export let ptk ,lva;
const LV=getContext('LV');
let caption='';
if (item.line) caption=ptk.getHeading(item.line+1).caption; //readable

const division=lva.getNode(item.idx);
const from=division.from?division.from+1:'1';

</script>

<span class='rightmenu'>
{#if caption}<!-- navigating a reading segment -->
{#if LV.canless(item.idx)}<span class='clickable' on:click={()=>LV.onless(item.idx)}>⭱</span>{/if}
<span class='clickable' on:click={()=>LV.onmore(item.idx)}>⭳</span>
<span class='clickable' on:click={()=>LV.onprev(item.idx)}>{from}/</span><span class='clickable' on:click={()=>LV.onnext(item.idx)}>{division.last-division.first}</span>

<span class='clickable lineviewheading' on:click={()=>LV.ontop(item.idx)}>{caption}</span>
{/if}
<span class='clickable'on:click={()=>LV.onremove(item.idx)}>⨯</span>
</span>

<style>
	.rightmenu {float: right; padding-right: 0.5em ;user-select: none;}

</style>