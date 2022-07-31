<script>
import {onMount} from 'svelte'
import {LVA,loadScript,parseAddress} from 'ptk'
import LineView from './lineview/lineview.svelte';
import LibraryToolbar from './librarytoolbar.svelte';
import {lvaddr} from './ts/store.ts';

let lisp ,lva , items;
const updateLVA=async (address)=>{
	lva=new LVA(address);
	items = await lva.load();
	if (items&&items.length) {
		loadScript(items[0].ptkname+'/ptk.css');
	}
}

$: updateLVA( $lvaddr)
const oninsert=({detail})=>{
	let nearest=detail.seq;
	while (nearest && items[nearest].idx==-1) nearest--;
	const seq=items[nearest]?.seq||0;
	breakat=detail.seq-nearest;
	lva.dig(detail.address, items[nearest]?.idx||0, breakat);
	lvaddr.set(lva.stringify());
}

const onremove=(seq)=>{
	if (seq.detail) seq=seq.detail; //from dispatch
	if (typeof seq=='number') { //delete by close button
		let idx=items[seq].idx;
		while (idx==-1 && seq) {
			seq--;
			idx=items[seq].idx;
		}
		lva.remove( idx );
	} else {
		lva.remove( seq );// delete by link 
	}
	lvaddr.set( lva.stringify() );
}
</script>
<LibraryToolbar {oninsert}/>
<LineView {onremove} {oninsert} {items}/>