<script>
import InnerLink from './innerlink.svelte'
import {onMount} from 'svelte'
import {usePtk} from 'ptk'
export let name;
export let key;
export let ptkname;
export let foreign;
export let caption;

let row=[];
$: name;
onMount(()=>{
	const ptk=usePtk(ptkname);
	row=ptk.rowOf(foreign, key);
})
</script>
{#each row as field}
{#if field.name[0]=='#' && field.value }
<InnerLink {caption} address={'('+ptkname+' @'+field.name.slice(1)+'#'+field.value+')'}/>
{:else if (field.type!=='number')}
{field.value&&field.value.length?field.name:''}{field.value}
{/if}
{/each}