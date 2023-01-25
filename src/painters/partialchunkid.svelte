<script>
import { onMount,getContext } from "svelte";
import Button from '../comps/button.svelte';
// export let keys;
export let ptk;
export let defattrs; // from ^:typedef<aname=avalue>
// export let name;
// export let classes;
// export let tagname;
// export let backref; //the backward ref column
// export let masterid;
// export let key;
export let id;
// export let extra;
// export let value;
export let seq;
// export let togglebutton=false;
let showing ;
const LV=getContext('LV');
$: items=[];
const tf=(defattrs.prefix||'')+ id+(defattrs.suffix||'');
const ck=ptk.defines.ck;
onMount(()=>{
	for (let i=0;i<ck.fields.id.values.length;i++) {
	const v=ck.fields.id.values[i];
	if (~v.indexOf(tf)) {
		items.push(i);
	}
	}
	items=items;
})
const sickname=n=>{
	let text=ck.innertext.get(n);
	if (!text) {
		text=ptk.template.onChunkCaption(ck.fields.id.values[n],1);
	}
	return text;
}
const openChunk=n=>{
	const id=ck.fields.id.values[n];
	const address='ck'+(parseInt(id)?id:'#'+id);
	LV.insertAddress(address,seq);
}
</script>
{#if items.length}
<Button onclick={()=>showing=!showing} >{defattrs.caption}{items.length}</Button>
{#if showing}
（{#each items as item}
<Button className="backref" onclick={()=>openChunk(item)}>{sickname(item)+' '}</Button>
{/each}）
{/if}
{/if}
