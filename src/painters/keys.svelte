<script>

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
export let firstchild;
export let masterid;
export let classes='';

let showing=-1;
items= items||value.split(',');

</script>
{#if after || !value}
<span class={ptkname+" "+tagname+" "+name+" keys_start"}></span>{#each items as key}
<ToggleLink {tagname} {classes} {firstchild} {name} {keys} {key}/><BackRef  {name} {masterid} {foreign} {tagname} {keys} {key}/>{/each}<span class={ptkname+" "+tagname+" "+name+" keys_end"}></span>{/if}
<style>
	.active {color: yellow}
</style>