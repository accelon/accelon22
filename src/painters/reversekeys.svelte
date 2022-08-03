<script>
import {getContext} from 'svelte';

import ToggleLink from './togglelink.svelte';
export let name;
export let ptkname;
export let tagname;
export let keys;
export let items;
export let classes;
const ctx=getContext('LV');
const onclick=(id)=>{
	ctx.insertAction(tagname+id);
}
</script>
{#if items.length}
<span class={ptkname+" "+tagname+" "+name+" keys_start"}>(</span>{#each items as key,idx}
{idx?' ':''}<ToggleLink onclick={()=>onclick(key)} clickable={true} text={keys.get(key)}/>{/each}<span class={ptkname+" "+tagname+" "+name+" keys_end"}>)</span>
{/if}
