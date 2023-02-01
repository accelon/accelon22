<script>
import {getContext} from 'svelte'
import Button from '../comps/button.svelte';
import {makeChunkAddress} from 'ptk';
export let links;
export let seq;

const LV=getContext('LV');
const jump=(ck,line)=>{
    const address=makeChunkAddress(ck,line-ck.line);
    LV.insertAddress(address,seq);
}
</script>
{#each links as link}
<Button className="clickable backlink" onclick={()=>jump(link.ck,link.line)}>
{link.ck.caption}({link.ck.bk.caption})</Button>{' '}
{/each}
