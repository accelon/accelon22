<script>
import {loadLVA,undigLVA,parseLVA,loadScript,digLVA,stringifyLVA,parseAddress} from 'ptk'
import {onMount} from 'svelte'
import {get} from 'svelte/store'
import {VirtualScroll} from '../3rdparty/virtualscroll'
import LineViewItem from './lineviewitem.svelte'
import {lvaddr} from '../ts/store.ts'
let lisp;
let list,data=[],ptkname;

const updateLVA=async (lva)=>{
	data = await loadLVA(lva);
	console.log('updateLVA',data)
	if (data&&data.length) {
		loadScript(data[0].host+'/ptk.css');
	}
}

$: updateLVA( $lvaddr)
const insert=({detail})=>{
	let nearest=detail.seq;
	while (nearest && !data[nearest].lva) {
		nearest--;
	}
	const seq=data[nearest].seq;
 	let toinsert=digLVA(data[nearest].lva , detail.address, breakat=detail.seq-nearest);
	const newaddr=data.filter(it=>it.lva).map((it,idx)=>(idx==seq&&toinsert)?toinsert:it.lva).join(' ');
	const newaddress=stringifyLVA(parseLVA(newaddr));
	lvaddr.set(newaddress);
}


const undig=(up,down)=>{
	if (!up || !down) return null;
	if (!(up.ptkname&&down.ptkname&&up.depth==down.depth)) return null;
	return undigLVA(up.lva,down.lva);
}

const remove=(seq)=>{

	debugger
	return;
	if (seq.detail) seq=seq.detail; //from dispatch
	let up,down;
	if (seq>0) up=data[seq-1];
	let next=seq+1;	
	while (next<data.length && !data[next].lva) next++;
	down=data[next];
	const undigged=undig(up,down);
	let out=[];
	for (let i=0;i<data.length;i++) {
		if (data[i]==up && undigged) continue;
		else if (data[i]==down && undigged) {
			out.push(undigged);
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