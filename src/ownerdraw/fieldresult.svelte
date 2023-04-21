<script>
import {getContext} from 'svelte';
import Paging from '../comps/paging.svelte';
export let ptk;
export let items=[]
export let from;
export let last;
export let tofind;
export let column
export let field
export let dividx;
const LV=getContext('LV');
let pfrom=from;
const getField=(column,field,idx)=>{
    return ptk.columns[column][field][idx];
}
const getKey=(column,idx)=>{
    return ptk.columns[column].keys.get(idx);
}
const setFrom=()=>{
	if (pfrom==from) return;
	LV.setFrom(dividx,from);
	pfrom=from;
}
$: setFrom(from);
</script>
{column} {field} {tofind} <Paging className="excerptpaging" bind:from {last}/>
{#each items as item}
<br>No{getKey(column,item)} {getField(column,field,item)}
{/each}
