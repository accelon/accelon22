<script>
import { slide,fade } from 'svelte/transition';
import {get} from 'svelte/store'
import {VirtualScroll} from '../3rdparty/virtualscroll'
import LineViewItem from './lineviewitem.svelte'
export let onremove,oninsert;
let list;
export let items=[] ;
const slideshow=depth=>{
	if (depth) return {duration: 300}
	return {duration:0};
}
</script>
<VirtualScroll bind:this={list} key="key" keeps={50} data={items} height="95vh" let:data={item}>
{#if (item.edge==1||item.edge==3) && item.depth}<span on:click={()=>onremove(item.seq)} class='closebutton clickable'>⨯</span>{/if}
<div in:slide={ slideshow(item.depth)} out:slide>
<LineViewItem {...item} on:insert={oninsert} on:remove={onremove} ptkname={item.key.replace(/:.+/,'')}/>
</div>
</VirtualScroll>
<style>
	.closebutton {float: right; padding-right: 0.5em}
</style>