<script>
import {usePtk} from 'ptk';
import {getContext} from 'svelte';
import ToggleLink from './togglelink.svelte';
import BackRef from './backref.svelte';
export let name=''; //name of field
export let after;
export let foreign;
export let items; //from action/search engine
export let value; //from offtext
export let keys;
export let ptkname;
export let tagname;
export let masterid;
export let classes='';
const ctx=getContext('LV');

let showing=-1;
items= items||value.split(',');

const onclick=id=>{
	ctx.insertAction(tagname+id);
}
const isclickable=id=>{
	const ptk=usePtk(ctx.ptkname);
	return ptk.validId(tagname,id);
}

</script>
{#if after || !value}
<span class={ptkname+" "+tagname+" "+name+" keys_start"}></span>{#each items as key}
<ToggleLink onclick={()=>onclick(key)}  clickable={isclickable(key)} {tagname} {classes} {name} text={keys.get(key)}/><BackRef {ptkname} {name} {masterid} {foreign} {tagname} {keys} {key}/>{/each}<span class={ptkname+" "+tagname+" "+name+" keys_end"}></span>{/if}
