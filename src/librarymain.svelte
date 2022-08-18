<script>
import {onMount,setContext} from 'svelte'
import {LVA,makeAddress,loadScript,parseAddress} from 'ptk'
import LineView from './lineview/lineview.svelte';
import LibraryToolbar from './librarytoolbar.svelte';
import {lvaddr} from './ts/store.ts';

let lisp ,lva , items;
$: loaded=false;
const updateLVA=async (address)=>{
	lva=new LVA(address);
	items = await lva.load();
	if (items&&items.length) {
		await loadScript(items[0].ptkname+'/accelon22.css');
	}
	loaded=true; //load toolbar after all lines are loaded, prevent racing.
}
const getLVA=()=>lva;
$: updateLVA( $lvaddr);

const oninsert=({detail})=>{
	let nearest=detail.seq;
	while (nearest && items[nearest].idx==-1) nearest--;
	const nearestItem=items[nearest];
	const seq=nearestItem?.seq||0;
	if (nearestItem?.ownerdraw) {
		lva.insert(detail.address,nearest+1);
	} else {
		breakat=detail.seq-nearest;
		lva.dig(detail.address, items[nearest]?.idx||0, breakat);
	}
	lvaddr.set(lva.stringify());

}
const findDivisionIndex=seq=>{
	let idx=items[seq].idx;
	while (idx==-1 && seq) {
		seq--;
		idx=items[seq].idx;
	}
	return idx;
}
const onremove=(seq)=>{
	if (seq.detail) seq=seq.detail; //from dispatch
	if (typeof seq=='number') { //delete by close button
		const idx=findDivisionIndex(seq);
		lva.remove( idx );
	} else {
		lva.remove( seq );// delete by link 
	}
	lvaddr.set( lva.stringify() );
}

const onmore=(seq)=>{
	if (seq.detail) seq=seq.detail; //from dispatch
	const idx=findDivisionIndex(seq);
	lvaddr.set( lva.more(idx).stringify() );
}

const setFrom=(seq,from)=>{
	const idx=findDivisionIndex(seq);
	lvaddr.set( lva.setFrom(idx,from).stringify() );	
}

const insertAddress=(address,seq)=>{
	oninsert({detail:{address,seq}});
}
const insertAction=(action,seq)=>{
	insertAddress(makeAddress(ptkname,action),seq);
}
setContext('LV',{ insertAction, insertAddress, setFrom,onremove, getLVA });

</script>
{#if loaded}<LibraryToolbar {oninsert}/>{/if}
<LineView {onremove} {onmore} {items} {lva}/>