<script>
import {getContext} from 'svelte';
export let caption; //from ptk.getHeading
export let id;
export let tagname;
export let seq;
export let lineoff;
const LV=getContext('LV');
const open=()=>{
	LV.insertAddress(tagname+id+':'+lineoff,seq);
}

</script>
<span title={id} class='excerptheading clickable' on:click={open}>{caption}</span>