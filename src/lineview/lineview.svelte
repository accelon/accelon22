<script>
import {usePtk} from 'ptk';
import {VirtualScroll} from '../3rdparty/virtualscroll';
import LineViewItem from './lineviewitem.svelte';
import LineViewMenu from './lineviewmenu.svelte';
export let lva;
let list,refreshcount=0;
export let items=[] ;

const slideshow=depth=>{
	if (depth) return {duration: 100}
	return {duration:0};
}
const setActive=item=>{
	if (!item.text)return;
	for (let i=0;i<items.length;i++) {
		if (items[i]!==item && items[i].active) items[i].active=false;
	}
	item.active=true;
	refreshcount++;
}
const findDivisionIndex=seq=>{ //find closest division
	let idx=items[seq].idx;
	while (idx==-1 && seq) {
		seq--;
		idx=items[seq].idx;
	}
	return idx;
}
</script>
<VirtualScroll bind:this={list} key="key" keeps={50} data={items} height="95vh" let:data={item}>
{#if item.closable}
	<LineViewMenu {lva} {item} ptk={usePtk(item.key.replace(/:.+/,''))}/>
{/if}
<div on:click={()=>setActive(item)} class:lineviewitem={item.closable&&!item.depth}>
 
{#key refreshcount}
<LineViewItem {...item} {lva} dividx={findDivisionIndex(item.seq)} ptk={usePtk(item.key.replace(/:.+/,''))}/>
{/key}
</div>
</VirtualScroll>
