<script>
import ReverseKeys from './reversekeys.svelte'
import {onMount} from 'svelte'

export let name;
export let seq;
export let classes='';
export let key;
export let ptk;
export let tagname;
export let masterid

let row=[];
onMount(()=>{
	row=ptk.rowOf(name, key);
})

const displayItem=items=>{
	return items.filter(it=>it!=masterid);
}

</script>
{#each row as field}
{#if (field.type!=='number') && field.value && field.value.length}
<ReverseKeys {ptk} {tagname} {classes} {seq} keys={ptk.columns[field.typedef.foreign||name].keys} name={field.name} items={displayItem(field.value)}/>
{/if}
{/each}