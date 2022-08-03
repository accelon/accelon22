<script>
import ReverseKeys from './reversekeys.svelte'
import {onMount} from 'svelte'
import {usePtk} from 'ptk'

export let name;
export let classes='';
export let key;
export let ptkname;
export let tagname;
let ptk , keys;

let row=[],seq=0;
onMount(()=>{
	ptk=usePtk(ptkname);
	row=ptk.rowOf(name, key);
})

const reverseItem=items=>{
	// return items.filter(it=>it!=masterid);
	return items;
}

</script>
{#each row as field}
{#if (field.type!=='number') && field.value}
<ReverseKeys {ptkname} {tagname} {classes} keys={ptk.columns[field.typedef.foreign].keys} name={field.name} items={reverseItem(field.value)}/>
{/if}
{/each}