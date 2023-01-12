<script>
import {getContext} from 'svelte'
const LV=getContext('LV');
export let seq;
export let id;
export let line;//use line if id is missing
export let tagname; 
const onclick=()=>{
	LV.insertAddress('*'+(tagname)+'=~'+(id?id:line),seq);
}

</script>
<span class="clickable" on:click={()=>onclick()}>≈</span>
