<script>
import {getContext} from 'svelte';
export let caption; //from ptk.getHeading
export let id;
export let tagname;
export let seq;
export let lineoff=0;
export let hidechunk;
const LV=getContext('LV');
const open=()=>{
	const address=tagname+id+(lineoff?':'+lineoff:'');
	LV.insertAddress(address,seq);
}

</script>
{#if hidechunk}
<span class='clickable' on:click={open}>⮨</span>
{:else}
{id}.<span class='excerptheading clickable' on:click={open}>{caption}</span>
{/if}