<script>
import {usePtk} from 'ptk';
import {slide,fade } from 'svelte/transition';
import {get} from 'svelte/store';
import {VirtualScroll} from '../3rdparty/virtualscroll';
import LineViewItem from './lineviewitem.svelte';
export let onremove,onmore,lva;
let list;
export let items=[] ;
const slideshow=depth=>{
	if (depth) return {duration: 300}
	return {duration:0};
}
</script>
<VirtualScroll bind:this={list} key="key" keeps={50} data={items} height="95vh" let:data={item}>
{#if item.closable}<span on:click={()=>onremove(item.seq)} class='closebutton clickable'>⨯</span>{/if}
<div class:lineviewitem={item.closable&&!item.depth} in:slide={slideshow(item.depth)} out:slide>
<LineViewItem {...item} {lva} {onmore} ptk={usePtk(item.key.replace(/:.+/,''))}/>
</div>
</VirtualScroll>
<style>
	.closebutton {float: right; padding-right: 0.5em}
</style>