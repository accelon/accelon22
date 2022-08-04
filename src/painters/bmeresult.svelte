<script>
import {onMount,getContext} from 'svelte';
import ToggleLink from './togglelink.svelte';
import BackRef from './backref.svelte';
const ctx=getContext('LV');
export let ptk;

export let items=[]; //index in lexicon
export let lexicon;
export let tofind;
export let name;
export let tagname;

let displayitems=[];
let showcount=items.length;
const ITEMPERPAGE=10;
if (showcount>ITEMPERPAGE) showcount=ITEMPERPAGE;
const getItems=()=>{
	const out=[];
	for (let i=0;i<showcount  && i<items.length;i++) {
		out.push(lexicon.get(items[i]).replace(tofind,'<span class="highlight">'+tofind+'</span>'));
	}
	return out;
}
const showmore=()=>{
	showcount+=ITEMPERPAGE;
}

$: displayitems=getItems(showcount);
const onclick=idx=>{
	const id=items[idx];
	ctx.insertAction(tagname+id);
}
const isclickable=idx=>{
	if (!ptk) return;
	const id=items[idx];
	return ptk.validId(tagname,id);
}

</script>
{#each displayitems as item,idx}
{idx?' ':''}<ToggleLink onclick={()=>onclick(idx)} clickable={isclickable(idx)} text={item}/><BackRef {name} {tagname} {ptk} keys={lexicon} key={items[idx]}/>
{/each}
{#if showcount<items.length}
<span class="clickable" on:click={()=>showmore()}>+{items.length-showcount}</span>
{/if}
