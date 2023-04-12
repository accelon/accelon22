<script>
import {getContext} from 'svelte';
import {usePtk} from 'ptk';
import LineViewItem from './lineviewitem.svelte';
import LineViewMenu from './lineviewmenu.svelte';
// import { slide ,fly} from 'svelte/transition';
const LV=getContext('LV');
export let lva;
export let items=[] ;
export let activeword;
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
}
const mousewheel=(e,idx)=>{
	if (e.deltaY>0) {
		LV.onnext(idx,2)
	} else {
		LV.onprev(idx,2);
	}
	e.stopPropagation()
}
</script>
{#each items as item}
<div on:click={()=>setActive(item)} class:lineviewitem={item.closable&&!item.depth} aria-hidden={true}
	on:wheel={e=>mousewheel(e, findDivisionIndex(item.seq) )}>
{#if item.closable}
<LineViewMenu {lva} {item} ptk={usePtk(item.key.replace(/:.+/,''))}/>
{/if}
<LineViewItem {...item} {lva} {activeword} dividx={findDivisionIndex(item.seq)} ptk={usePtk(item.key.replace(/:.+/,''))}/>
</div>
{/each}