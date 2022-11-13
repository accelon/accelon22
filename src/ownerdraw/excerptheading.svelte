<script>
import {getContext} from 'svelte';
export let id;
export let tagname;
export let seq;
export let lineoff=0;
const LV=getContext('LV');
const open=()=>{
	const address=tagname+id+(lineoff?':'+lineoff:'');
	LV.insertAddress(address,seq);
}

</script>
<span class='clickable' on:click={open}>⮨</span>