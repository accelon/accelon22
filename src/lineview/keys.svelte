<script>
export let name='';
export let foreign;
export let value;
export let keys;
export let ptkname;
export let tagname;
export let classes='';
import KeyRow from './keyrow.svelte';
let showing=-1;
const items=value.split(',');
const forward=(keyidx)=>{
	if (showing==keyidx) showing=-1
	else showing=keyidx;
}
</script>
<span class={ptkname+" "+tagname+" "+name+" keys_start"}></span>{#each items as key}
<span on:click={()=>forward(key)} class={classes+' clickable '+name}>{keys.get(key)}</span>
{#if showing==key}<KeyRow {name} caption={keys.get(key)} {key} {foreign} {ptkname}/>{/if}
{/each}
<span class={ptkname+" "+tagname+" "+name+" keys_end"}></span>