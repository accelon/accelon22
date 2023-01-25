<script>
import {getContext} from 'svelte'
import Button from '../comps/button.svelte';
const LV=getContext('LV');
export let seq;
export let id;
export let line;//use line if id is missing
export let tagname; 
const onclick=()=>{
	LV.insertAddress('*'+(tagname)+'=~'+(id?id:line),seq);
}

</script>
<Button onclick={()=>onclick()}>≈</Button>
