<script>
import {LVA,loadScript,parseAddress} from 'ptk'
import {onMount} from 'svelte'
import { slide,fade } from 'svelte/transition';
import { quintOut } from 'svelte/easing';

import {get} from 'svelte/store'
import {VirtualScroll} from '../3rdparty/virtualscroll'
import LineViewItem from './lineviewitem.svelte'
import {lvaddr} from '../ts/store.ts'
let lisp ,lva;
let list,data=[],ptkname;

const updateLVA=async (address)=>{
	lva=new LVA(address);
	data = await lva.load();
	if (data&&data.length) {
		loadScript(data[0].host+'/ptk.css');
	}
}

$: updateLVA( $lvaddr)
const insert=({detail})=>{
	let nearest=detail.seq;
	while (nearest && data[nearest].idx==-1) nearest--;
	const seq=data[nearest].seq;
	breakat=detail.seq-nearest;
	lva.dig(detail.address, data[nearest].idx, breakat);
	lvaddr.set(lva.stringify());
}

const remove=(seq)=>{
	if (seq.detail) seq=seq.detail; //from dispatch
	if (typeof seq=='number') { //delete by close button
		let idx=data[seq].idx;
		while (idx==-1 && seq) {
			seq--;
			idx=data[seq].idx;
		}
		lva.remove( idx );
	} else {
		lva.remove( seq );// delete by link 
	}
	lvaddr.set( lva.stringify() );
}
const slideshow=depth=>{
	if (depth) return {duration: 300}
	return {duration:0};
}
</script>
<VirtualScroll bind:this={list} key="key" keeps={50} {data} height="95vh" let:data={item}>
{#if (item.edge==1||item.edge==3) && item.depth}<span on:click={()=>remove(item.seq)} class='closebutton clickable'>⨯</span>{/if}
<div in:slide={ slideshow(item.depth)} out:slide>
<LineViewItem {...item} on:insert={insert} on:remove={remove} ptkname={item.key.replace(/:.+/,'')}/>
</div>
</VirtualScroll>
<style>
	.closebutton {float: right; padding-right: 0.5em}
</style>