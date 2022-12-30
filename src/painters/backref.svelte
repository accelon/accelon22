<script>
import ColumnRow from './columnrow.svelte';
import BackRefList from './backreflist.svelte'
export let keys;
export let ptk;
export let name;
export let classes;
export let tagname;
export let backref; //the backward ref column
export let masterid;
export let key;
export let seq;
export let togglebutton=false;
let showing ;
$: tofind=keys.get(key);
$: painter=tagname==='*'?BackRefList:ColumnRow;
const forward=(keyidx)=>{
	if (showing==keyidx) showing=-1
	else {
		showing=keyidx;
	}
}
</script>
{#if togglebutton}<span on:click={()=>forward(key)} class="clickable"
  class:active={showing==key}>⛓️</span>{/if}{#if showing==key}(<svelte:component 
this={painter} {tagname} {seq} {key} showitemlength={true}
 {name} {ptk} {masterid} {keys} {classes} {backref} {tofind}/>){/if}