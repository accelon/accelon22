<script>
import ColumnRow from './columnrow.svelte';
export let keys;
export let ptk;
export let name;
export let classes;
export let tagname;
export let masterid;
export let key;
export let seq;
let showing;
const forward=(keyidx)=>{
	if (showing==keyidx) showing=-1
	else showing=keyidx;
}

</script>
<span on:click={()=>forward(key)} class="clickable" class:active={showing==key}>⮒</span>{#if showing==key}(<ColumnRow caption={keys.get(key)} {seq} {key} {name} {ptk} {tagname} {masterid} {keys} {classes} />){/if}