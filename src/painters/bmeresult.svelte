<script>
import {usePtk,makeAddress,sameAddress} from 'ptk'
import {getContext} from 'svelte';
import ToggleLink from './togglelink.svelte';
import BackRef from './backref.svelte';
const ctx=getContext('LV');

export let items=[]; //index in lexicon
export let lexicon;
export let tofind;
export let tagname;
let displayitems=[];
let showcount=items.length;
const ITEMPERPAGE=10;
if (showcount>ITEMPERPAGE) showcount=ITEMPERPAGE;
const getItems=()=>{
	const out=[];
	for (let i=0;i<showcount  && i<items.length;i++) {
		out.push(lexicon.get(items[i]).replace(tofind,'<span class="highlight">'+tofind+'</span>') );

	}
	return out;
}
const showmore=()=>{
	showcount+=ITEMPERPAGE;
}
$: displayitems=getItems(showcount);
const onclick=idx=>{
	const id=items[idx];
	const address=makeAddress(ctx.ptkname,tagname+id);
	ctx.insertAddress(address);
}
const isclickable=idx=>{
	const id=items[idx];
	const ptk=usePtk(ctx.ptkname);
	return ptk.validId(tagname,id);
}
let foreign=''

</script>
{#each displayitems as item,idx}
{idx?' ':''}<ToggleLink onclick={()=>onclick(idx)} clickable={isclickable(idx)} text={item}/><BackRef  {foreign} {tagname} keys={lexicon} />
{/each}
{#if showcount<items.length}
<span class="clickable" on:click={()=>showmore()}>+{items.length-showcount}</span>
{/if}
