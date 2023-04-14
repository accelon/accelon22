<script>
import {getContext} from 'svelte';
import {usePtk} from 'ptk';
import LineViewItem from './lineviewitem.svelte';
import LineViewMenu from './lineviewmenu.svelte';
import {swipenext,swipeprev,swipestart,swipeend} from '../comps/icons.ts';
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
let touchx=0,touchy=0,startx=0,starty=0,direction=0;
const ontouchstart=(e,idx)=>{
	if (e.touches.length==1){
		startx=e.touches[0].pageX;
		starty=e.touches[0].pageY;
		touchx=startx;
		touchy=starty;
		touching=idx;
	}
}
const getDirection=(idx)=>{
	if (Math.abs(touchy-starty)>30) return 0;
	const delta=touchx-startx;
	if (delta>60) {
		if (!LV.cannext(idx)) return 0;
		return (delta>200)?-2:-1;
		
	} else if (delta<-60) {
		if (!LV.canprev(idx)) return 0;
		return (delta<-200) ?2:1;
	}
	return 0;
}
const ontouchmove=(e,idx)=>{
	if (touching==-1)return;
	if (touching>-1) {
		touchx=e.touches[0].pageX;
		touchy=e.touches[0].pageY;
		direction=getDirection(idx);
	}
}
const ontouchend=(e,idx)=>{
	if (touching!==-1 && direction!==0) {
		if (direction==1) LV.onprev(idx);
		else if (direction==2) LV.onstart(idx);
		else if (direction==-1) LV.onnext(idx);
		else if (direction==-2) LV.onend(idx);
		
	}
	touching=-1; 
	direction=0;
}
const swipeshapes=[ swipeend,swipenext, , swipeprev,swipestart];
</script>
<div>
{#each items as item,idx}
{@const dividx=findDivisionIndex(item.seq)}
<div aria-hidden={true}
	on:touchstart|passive={e=>ontouchstart(e,dividx)}
	on:touchmove|passive={e=>ontouchmove(e,dividx)}
	on:touchend|passive={e=>ontouchend(e,dividx)}
	on:click={()=>setActive(item)} class:lineviewitem={item.closable&&!item.depth}
	on:wheel={e=>mousewheel(e, dividx )}>

{#if item.closable}<LineViewMenu {lva} {item} ptk={usePtk(item.key.replace(/:.+/,''))}/>
{#if touching==dividx && direction}<span class="swipe">{@html swipeshapes[direction+2]}</span>{/if}
{/if}
<LineViewItem {...item} {lva} {activeword} {dividx} ptk={usePtk(item.key.replace(/:.+/,''))}/>
</div>
{/each}
</div>

<style>
	.swipe {position:absolute;margin-top:2em;left:40%}
</style>