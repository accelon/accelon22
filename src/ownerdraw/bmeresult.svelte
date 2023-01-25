<script>
// Begin-Middle-End search result
import Button from '../comps/button.svelte';
import {getContext} from 'svelte';
import ToggleLink from '../painters/togglelink.svelte';
import BackRef from '../painters/backref.svelte';
const LV=getContext('LV');
export let ptk;
export let seq;
export let items=[]; //index in lexicon
export let lexicon;
export let tofind;
export let name;  //the name of this column
export let tagname;
export let backref;//the backref column for reverse lookup

$: showcount=items.length>ITEMPERPAGE?ITEMPERPAGE:items.length;
const ITEMPERPAGE=10;
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

$: displayitems=getItems(showcount,items); //need to add items to successfully refresh
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
{idx?' ':''}<ToggleLink onclick={()=>onclick(idx)} clickable={isclickable(idx)} text={item}/><BackRef togglebutton={true} {name} {backref} {tagname} {seq} {ptk} keys={lexicon} key={items[idx]}/>
{/each}
{#if showcount<items.length}
<Button onclick={showmore}>+{items.length-showcount}</Button>
{/if}
