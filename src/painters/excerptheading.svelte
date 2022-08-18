<script>
import {getContext} from 'svelte';
export let caption; //from ptk.getHeading
export let id;
export let tagname;
export let seq;
const ctx=getContext('LV');
const open=()=>{
	ctx.insertAction(tagname+id,seq);
}

</script>
<span class='clickable' on:click={open}>{caption}</span>