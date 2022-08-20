<script>
import {getContext} from 'svelte';
import ToggleLink from './togglelink.svelte';
import BackRef from './backref.svelte';
export let name=''; //name of field
export let seq;
export let after;
export let foreign;
export let items; //from action/search engine
export let value; //from offtext
export let keys;
export let ptk;
export let tagname;
export let masterid;
export let classes='';
const ctx=getContext('LV');

let showing=-1;
items= items||value.split(',');

const onclick=id=>{
	ctx.insertAction(tagname+id,seq);
}
const isclickable=id=>{
	return ptk.validId(tagname,id);
}
const hasColumnRow=(key)=>{
	const row=ptk.rowOf(foreign, key);
	return row.reduce((prev,item)=>item.value.filter(it=>it!=masterid).length+prev,0);
}
</script>
{#if after || !value}
<span class={ptk.name+" "+tagname+" "+name+" keys_start"}></span>{#each items as key,idx}
<ToggleLink onclick={()=>onclick(key)} clickable={isclickable(key)} {tagname} {classes} {name} text={keys.get(key)}/>{#if hasColumnRow(key)}<BackRef {ptk} {seq} name={foreign} {masterid} {foreign} {tagname} {keys} {key}/>{:else}{' '}{/if}
{/each}<span class={ptk.name+" "+tagname+" "+name+" keys_end"}></span>{/if}
