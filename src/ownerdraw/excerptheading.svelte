<script>
import {getContext} from 'svelte';
export let id;
export let tagname;
export let seq;
export let ptk;
export let lineoff=0;
const LV=getContext('LV');
const openchunk=()=>{
	const address=ptk.name+':'+tagname+(parseInt(id)?id:'#'+id)+(lineoff?':'+lineoff:'');
	LV.insertAddress(address,seq);
}

</script>
<span class='clickable' on:click={openchunk}>⮨</span>