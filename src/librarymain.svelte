<script>
import {setContext} from 'svelte'
import {LVA,loadScript} from 'ptk'
import LineView from './lineview/lineview.svelte';
import LibraryToolbar from './librarytoolbar.svelte';
import {lvaddr} from './ts/store.ts';
let value=''; //input
let lva , items;
$: loaded=false;
const updateLVA=async (address)=>{
	lva=new LVA(address);
	items = await lva.load();
	if (items.length) {
		await loadScript(items[0].ptkname+'/accelon22.css');
	}
	loaded=true; //load toolbar after all lines are loaded, prevent racing.
}
const getLVA=()=>lva;
$: updateLVA( $lvaddr);

const oninsert=({detail})=>{
	let nearest=detail.seq;
	const lineoff=detail.lineoff;
	while (nearest>0 && items[nearest] && items[nearest].idx==-1) nearest--;
	const nearestItem=items[nearest];
	// const seq=nearestItem?.seq||0;
	if (nearestItem?.ownerdraw || detail.seq==-1) { //seq==-1 insert as top, seq==-2 insert at next division
		let insertat=nearestItem?.idx;
		if (detail.seq==-1) insertat=-1; //from toolbar
		lva.insert(detail.address,insertat+1);
	} else {
		breakat=detail.seq-nearest;
		lva.dig(detail.address,nearestItem?.idx||0, breakat);
	}
	lvaddr.set(lva.stringify());
}
const onremove=(idx)=>{
	clearActive();  // svelte runtime error if activeline lower than division to be removed
	if (idx.detail) idx=idx.detail; //from dispatch
	if (typeof idx=='number') { //delete by close button
		lva.remove(idx);
	} else {
		lva.remove(idx);// delete by link 
	}
	lvaddr.set( lva.stringify() );
}

const onnext=(idx)=>{
	if (idx?.detail) idx=idx.detail;
	lvaddr.set( lva.next(idx).stringify() );
}
const onprev=(idx)=>{
	if (idx?.detail) idx=idx.detail;
	lvaddr.set( lva.prev(idx).stringify() );
}
const onmore=(idx)=>{
	if (idx?.detail) idx=idx.detail;
	lvaddr.set( lva.more(idx).stringify() );
}
const onless=(idx)=>{
	if (idx?.detail) idx=idx.detail;
	lvaddr.set( lva.less(idx).stringify() );
}
const ontop=(idx)=>{
	if (idx?.detail) idx=idx.detail;
	lvaddr.set( lva.top(idx).stringify() );
}
const canless=(idx)=>{
	if (idx?.detail) idx=idx.detail;
	return lva.canless(idx);
}
const canmore=(idx)=>{
	if (idx?.detail) idx=idx.detail; 
	return lva.canmore(idx);
}
const cannext=(idx)=>{
	if (idx?.detail) idx=idx.detail;
	return lva.cannext(idx);
}
const canprev=(idx)=>{
	if (idx?.detail) idx=idx.detail; 
	return lva.canprev(idx);
}
const setFrom=(idx,from)=>{
	lvaddr.set( lva.setFrom(idx,from).stringify() );	
}
const insertAddress=(address,seq)=>{
	oninsert({detail:{address,seq}});
}
const setActive=item=>{
	if (!item.text)return;
	clearActive();
	item.active=true;
}
const clearActive=()=>{
	for (let i=0;i<items.length;i++) {
		if (items[i].active) items[i].active=false;
	}
}
const setTofind=tofind=>{
	value=tofind;
}
setContext('LV',{ insertAddress, setFrom, setActive, clearActive,setTofind,
	canless,canmore,cannext,canprev,onremove,onnext,onprev, ontop,onmore,onless,getLVA });

</script>
{#if loaded}<LibraryToolbar {value} {oninsert}/>{/if}
<LineView  {items} {lva}/>