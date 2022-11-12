<script>
import {getContext} from 'svelte';

import ToggleLink from './togglelink.svelte';
export let name;
export let seq;
export let ptk;
export let tagname;
export let keys;
export let items;
const LV=getContext('LV');
const onclick=(id)=>{
	LV.insertAddress(tagname+id,seq);
}
const ITEMPERPAGE=10;
let showcount=ITEMPERPAGE;
const showmore=()=>{
	showcount+=ITEMPERPAGE;
}

$: displayitems=items.slice(0,showcount);

</script>
{#if displayitems.length}
<span class={ptk.name+" "+tagname+" "+(name?name:'')+" keys_start"}>{#each displayitems as key,idx}
{idx?' ':''}<ToggleLink onclick={()=>onclick(key)} clickable={true} text={keys.get(key)}/>{/each}</span>{/if}{#if showcount<items.length}<span class="clickable" on:click={()=>showmore()}>+{items.length-showcount}</span>{/if}<span class={ptk.name+" "+tagname+" "+name+" keys_end"}></span>