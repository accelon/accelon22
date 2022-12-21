<script>
// Begin-Middle-End search result
import {getContext} from 'svelte';
import ToggleLink from '../painters/togglelink.svelte';
import BackRef from '../painters/backref.svelte';
const LV=getContext('LV');
export let ptk;
export let seq;
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
	if (tagname=='*') {
		LV.insertAddress('*='+lexicon.get(id),(seq||0));
	} else {
		LV.insertAddress(tagname+id,seq||0);
	}
}
const isclickable=idx=>{
	if (!ptk) return;
	const id=items[idx];
	if (tagname=='*') return true; //fulltext search
	return ptk.validId(tagname,id);
}
</script>
{#each displayitems as item,idx}
{idx?' ':''}<ToggleLink onclick={()=>onclick(idx)} clickable={isclickable(idx)} text={item}/><BackRef {name} {tagname} {ptk} keys={lexicon} key={items[idx]}/>
{/each}
{#if showcount<items.length}
<span class="clickable" on:click={()=>showmore()}>+{items.length-showcount}</span>
{/if}
