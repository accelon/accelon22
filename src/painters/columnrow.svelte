<script>
import ReverseKeys from './reversekeys.svelte'
import {onMount} from 'svelte'
import {usePtk} from 'ptk'

export let name;
export let classes;
export let key;
export let keys;
export let ptkname;
export let tagname;
export let foreign;
export let masterid;


let row=[],seq=0;
$: name;
onMount(()=>{
	const ptk=usePtk(ptkname);
	row=ptk.rowOf(foreign, key);
})

const reverseItem=items=>{
	return items.filter(it=>it!=masterid);
}

</script>
{#each row as field}
{#if (field.type!=='number') && field.value}
<ReverseKeys {ptkname} {tagname} {classes} {keys} {masterid} name={field.name} items={reverseItem(field.value)}/>
{/if}
{/each}