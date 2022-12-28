<script>
import {getContext} from 'svelte'
const LV=getContext('LV');

export let ptk;
export let seq;
export let id;
export let foreign;//medicine
export let tagname;//
export let backref
const onclick=()=>{
	LV.insertAddress('*'+tagname+'=~'+id,seq);
}
</script>
<span class="clickable" on:click={()=>onclick()}>≈</span>
