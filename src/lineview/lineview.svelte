<script>
import {getContext} from 'svelte';
import {usePtk} from 'ptk';
import {VirtualScroll} from '../3rdparty/virtualscroll';
import LineViewItem from './lineviewitem.svelte';
import LineViewMenu from './lineviewmenu.svelte';
const LV=getContext('LV');

export let lva;
let list=0;
$: updatecount=0;
export let items=[] ;

const slideshow=depth=>{
	if (depth) return {duration: 100}
	return {duration:0};
}

const findDivisionIndex=seq=>{ //find closest division
	let idx=items[seq].idx;
	while (idx==-1 && seq) {
		seq--;
		idx=items[seq].idx;
	}
	return idx;
}
const setActive=item=>{
	LV.setActive(item);
	updatecount++
}
</script>
<VirtualScroll bind:this={list} key="key" keeps={50} data={items} height="95vh" let:data={item}>
{#if item.closable}
	<LineViewMenu {lva} {item} ptk={usePtk(item.key.replace(/:.+/,''))}/>
{/if}
<div on:click={()=>setActive(item)} class:lineviewitem={item.closable&&!item.depth}>
 
{#key updatecount}
<LineViewItem {...item} {lva} dividx={findDivisionIndex(item.seq)} ptk={usePtk(item.key.replace(/:.+/,''))}/>
{/key}
</div>
</VirtualScroll>
