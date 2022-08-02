<script>
import ColumnRow from './columnrow.svelte';
export let keys;
export let ptkname;
export let name='';
export let classes='';
export let foreign='';
export let tagname;
export let masterid;
export let key='';
let showing;
const forward=(keyidx)=>{
	if (showing==keyidx) showing=-1
	else showing=keyidx;
}

</script>
<span on:click={()=>forward(key)} class="clickable" class:active={showing==key}>…</span>
{#if showing==key}
<ColumnRow caption={keys.get(key)} {name} {ptkname} {tagname} {masterid} {keys} {classes} {key} {foreign}/>{/if}
