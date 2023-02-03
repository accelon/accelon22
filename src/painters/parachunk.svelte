<script>
import Button from '../comps/button.svelte';
import {getContext} from 'svelte'
const LV=getContext('LV');
export let seq;
export let items;
export const openchunk=(bkid,ckid)=>{
    const address='bk#'+bkid+'.ck#'+ckid;
    LV.insertAddress(address,seq)
}

</script>
{#each items as item}
<Button className="clickable parallelchunkbutton" onclick={()=>openchunk(item.bkid,item.ckid)}>{item.caption}</Button>{' '}
{/each}