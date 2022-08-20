<script>
import {getContext} from 'svelte';
export let caption; //from ptk.getHeading
export let id;
export let tagname;
export let seq;
export let lineoff;
const ctx=getContext('LV');
const open=()=>{
	ctx.insertAction(tagname+id,seq,lineoff);
}

</script>
<span class='excerptheading clickable' on:click={open}>{caption}</span>