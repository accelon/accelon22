<script>
import KeyRow from './keyrow.svelte';
import ToggleLink from './togglelink.svelte';


export let name='';
export let foreign;
export let value;
export let keys;
export let ptkname;
export let tagname;
export let firstchild;
export let masterid;
export let classes='';

let showing=-1;
const items=value.split(',');
const forward=(keyidx)=>{
	if (showing==keyidx) showing=-1
	else showing=keyidx;
}

</script>
<span class={ptkname+" "+tagname+" "+name+" keys_start"}></span>{#each items as key}
<ToggleLink {tagname} {classes} {firstchild} {name} {keys} {key}/><span on:click={()=>forward(key)} class="clickable" >…</span>
{#if showing==key}
<KeyRow caption={keys.get(key)} {name} {ptkname} {tagname} {masterid} {keys} {classes} {key} {foreign}/>{/if}
{/each}
<span class={ptkname+" "+tagname+" "+name+" keys_end"}></span>