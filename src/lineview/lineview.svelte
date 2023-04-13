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
	if (e.ctrlKey) return;
	if (e.deltaY>0) {
		LV.onnext(idx,2)
	} else {
		LV.onprev(idx,2);
	}
	e.preventDefault();
}
let touching=-1;
let touchx=0,touchy=0,startx=0,starty=0;
const ontouchstart=(e,idx)=>{
	if (e.touches.length==1){
		startx=e.touches[0].pageX;
		starty=e.touches[0].pageY;
		touchx=startx;
		touchy=starty;
		touching=idx;
		console.log('touching',touching)
		//e.preventDefault();
	}
}
const ontouchmove=(e,idx)=>{
	if (touching==-1)return;
	if (touching>-1) {
		touchx=e.touches[0].pageX;
		touchy=e.touches[0].pageY;
	}
}
const ontouchend=(e,idx)=>{
	if (touching==-1)return;
	touching=-1; 
	if (Math.abs(touchy-starty)>50) return;
	const delta=touchx-startx;
	if (delta>80) {
		LV.onprev(idx);
	} else if (delta<-50) {
		LV.onnext(idx);
	}	
	console.log(delta)
}
</script>
{#each items as item}
<div
	on:touchstart|passive={e=>ontouchstart(e,findDivisionIndex(item.seq))}
	on:touchmove|passive={e=>ontouchmove(e,findDivisionIndex(item.seq))}
	on:touchend|passive={e=>ontouchend(e,findDivisionIndex(item.seq))}

	on:click={()=>setActive(item)} class:lineviewitem={item.closable&&!item.depth} aria-hidden={true}
	on:wheel={e=>mousewheel(e, findDivisionIndex(item.seq) )}>
{#if item.closable}<LineViewMenu {lva} {item} ptk={usePtk(item.key.replace(/:.+/,''))}/>{/if}
<LineViewItem {...item} {lva} {activeword} 
dividx={findDivisionIndex(item.seq)} ptk={usePtk(item.key.replace(/:.+/,''))}/>
</div>
{/each}