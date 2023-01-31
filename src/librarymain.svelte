<script>
import {setContext} from 'svelte'
import {LVA,TokenType,tokenize} from 'ptk'
import LineView from './lineview/lineview.svelte';
import LibraryToolbar from './librarytoolbar.svelte';
import {tofind,palitrans, tosim,lvaddr,parallels,activeword} from './ts/store.ts';
import { get } from 'svelte/store';

let value=get(tofind); //input
let lva , items;
$: loaded=false;

const updateLVA=async (address)=>{
	lva=new LVA(address);
	items = await lva.load();
	loaded=true; //load toolbar after all lines are loaded, prevent racing.
}
const getLVA=()=>lva;
$: updateLVA( $lvaddr, $palitrans,$tosim);

const oninsert=({detail})=>{
	let nearest=detail.seq;
	const lineoff=detail.lineoff;
	if (detail.singleton) {
		const at=lva.findAction(detail.address);
		if (~at) {
			lva.remove(at); //move to top
			lvaddr.set(lva.stringify());
			if (at==0) return; //toggle to remove
		}
	}
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
const onnextchunk=(idx)=>{
	console.log('next chunk')
}
const onprevchunk=(idx)=>{
	console.log('next chunk')
}
const cannextchunk=(idx)=>{
	return true;
}
const canprevchunk=(idx)=>{
	return true;
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
const onpromote=(idx)=>{
	if (idx?.detail) idx=idx.detail;
	lvaddr.set( lva.promote(idx).stringify() );
}
const canless=(idx)=>{
	if (idx?.detail) idx=idx.detail;
	return lva.canless(idx);
}
const canpromote=(idx)=>{
	if (idx?.detail) idx=idx.detail; 
	return lva.canpromote(idx);
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
const setTofind=tf=>{
	value=tf;
	tofind.set(value);
}
const setParallel=( ptkname, foreign, onoff)=>{
	try {
		p=JSON.parse(get(parallels));
	} catch{
		p={};
	}
	
	if (!p[ptkname]) p[ptkname]={};	
	p[ptkname][foreign]=onoff;
	parallels.set(JSON.stringify(p));
}
const toggleActiveword=w=>{
	const tokens=tokenize(w);
	if (tokens.length && tokens[0].type<=TokenType.SEARCHABLE) return;
	if (get(activeword)==w) activeword.set('');
	else activeword.set(w);
}
const changeAction=(newaction,idx)=>{
	if (idx?.detail) idx=idx.detail; 
	lvaddr.set(lva.changeAction(newaction,idx).stringify() );
}
const changeAddress=(newaction,idx)=>{
	if (idx?.detail) idx=idx.detail; 
	lvaddr.set(lva.changeAction(newaction,idx,true).stringify() );
}


setContext('LV',{ insertAddress, setFrom, parallels,getLVA,
	changeAction,
	changeAddress,//reset from and till
	setActive,toggleActiveword, setTofind,setParallel, clearActive,
	canpromote,canless,canmore,cannext,canprev,
	onremove,onnext,onprev, ontop,onmore,onless,onpromote,
	onnextchunk,onprevchunk,cannextchunk,canprevchunk,
	 });

</script>
{#if loaded}<LibraryToolbar {value} {oninsert} {setTofind} />{/if}
<LineView  {items} {lva} activeword={$activeword}/>