<script>
import {getContext} from 'svelte';
export let address=''
const ctx=getContext('LV');
const insertAddress=()=>{
	ctx.insertAddress(address);
}
</script>

<span class="clickable" on:click={()=>insertAddress()}>⮒</span>
