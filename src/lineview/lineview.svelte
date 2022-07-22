<script>
import {loadLVA,combineLVA,parseLVA,loadScript,breakLVA,stringifyLVA} from 'ptk'
import {onMount} from 'svelte'
import {get} from 'svelte/store'
import {VirtualScroll} from '../3rdparty/virtualscroll'
import LineViewItem from './lineviewitem.svelte'
import {lvaddr} from '../ts/store.ts'
let lisp;
let list,data=[],ptkname;


const updateLVA=async (lva)=>{
	// console.log('updating LVA',lva);
	[ data, lisp , ptkname] = await loadLVA(lva);
	if (data.length) {
		loadScript(ptkname+'/ptk.css');
	}
	// console.log('update LVA',data)
}
$: updateLVA( $lvaddr)
const insert=({detail})=>{
	let nearest=detail.seq;
	while (nearest && !data[nearest].lva) {
		nearest--;
	}
	let lva,toinsert;
	const seq=data[nearest].seq;
	if (data[nearest].next==detail.seq+1) { 
		data[data[nearest].next].lva=parseLVA(detail.address); //replace
	} else {
		toinsert=breakLVA(data[nearest].lva , breakat=detail.seq-nearest , detail.address);
	}
	lva=data.filter(it=>it.lva).map((it,idx)=>(idx==seq&&toinsert)?toinsert:it.lva)
	if (lva.length==1) lva=lva[0];

	const s=ptkname+'+'+stringifyLVA(lva,ptkname);
	lvaddr.set(s);
}
const combine=(up,down)=>{
	if (!up || !down) return null;
	if (!(up.ptkname&&down.ptkname&&up.depth==down.depth)) return null;
	return combineLVA(up.lva,down.lva);
}

const remove=(seq)=>{
	if (seq.detail) seq=seq.detail; //from dispatch
	let up,down;
	if (seq>0) up=data[seq-1];
	let next=seq+1;	
	while (next<data.length && !data[next].lva) next++;
	down=data[next];
	const combined=combine(up,down);
	let out=[];
	for (let i=0;i<data.length;i++) {
		if (data[i]==up && combined) continue;
		else if (data[i]==down && combined) {
			out.push(combined);
			continue;
		}
		if (i!==seq && data[i].lva) out.push(data[i].lva);
	}
	if (out.length==1) out=out[0];
	const s=ptkname+'+'+stringifyLVA(out,ptkname);
	lvaddr.set(s);
}

</script>
<VirtualScroll bind:this={list} key="key" keeps={50} {data} height="95vh" let:data={item}>
{#if (item.edge==1||item.edge==3) && item.depth}<span on:click={()=>remove(item.seq)} class='closebutton clickable'>⨯</span>{/if}
<LineViewItem {...item} on:insert={insert} on:remove={remove} nextlvaseq={item.next} nextlva={((data[item.next]||[]).lva||[]).value} ptkname={item.key.replace(/:.+/,'')}/>
</VirtualScroll>
<style>
	.closebutton {float: right; padding-right: 0.5em}
</style>