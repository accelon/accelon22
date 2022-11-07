<script>
import {getContext} from 'svelte';
export let item,onremove, onnext, onprev;
export let ptk ,lva;
const LV=getContext('LV');
let caption='';
if (item.line) caption=ptk.getHeading(item.line+1).caption; //readable
const gototop=()=>{
	//goto top of the chunk
}
const division=lva.getNode(item.idx);
const from=division.from?division.from+1:'1';
</script>

<span class='rightmenu'>
{#if caption}<!-- navigating a reading segment -->
{#if LV.canless(item.seq)}<span class='clickable' on:click={()=>LV.onless(item.seq)}>-</span>{/if}

<span class='clickable' on:click={()=>LV.onprev(item.seq)}>{from}/</span><span class='clickable' on:click={()=>LV.onnext(item.seq)}>{division.last-division.first}</span>
<span class='clickable' on:click={()=>LV.onmore(item.seq)}>+</span>
<span class='clickable' on:click={()=>gototop()}>{caption}</span>
{/if}
<span class='clickable'on:click={()=>LV.onremove(item.seq)}>⨯</span>
</span>

<style>
	.rightmenu {float: right; padding-right: 0.5em ; background: var(--panel-background)}
</style>