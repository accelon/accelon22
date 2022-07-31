<script>
import {onMount} from 'svelte';
import Pitakas from './pitakas.svelte';
import { usePtk,debounce } from 'ptk';
export let oninsert;

let ptkname='cyd';
let value='青';
$: items=[];
const dosearch=()=>{
	const ptk=usePtk(ptkname);
	items=ptk.scanPrimaryKeys(value);
}
onMount(()=>value&&dosearch());
const insert=(keyname,mode=0)=>{
	let tofind=value;
	if (mode==0) tofind='^'+value;
	else if (mode==2) tofind=value+'$';
	oninsert({detail:{seq:0,address:ptkname+':'+ keyname +'='+tofind}});
}

</script>
<div class="toolbar">
<Pitakas/>
<input bind:value size=3 on:input={debounce(dosearch,250)}/>
{#each items as item}
{#if item.start.length+item.middle.length+item.end.length}
<span class="clickable" on:click={()=>item.start.length&&insert(item.name,0)}>{item.caption}{item.start.length}</span><span class="clickable" on:click={()=>item.middle.length&&insert(item.name,1)}>[{item.middle.length}]</span><span class="clickable" on:click={()=>item.end.length&&insert(item.name,2)}>{item.end.length}|</span>
{/if}
{/each}
</div>
