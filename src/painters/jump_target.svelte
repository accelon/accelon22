<script>
import {getContext} from 'svelte'
import Button from '../comps/button.svelte';
import {makeChunkAddress} from 'ptk';
export let links;
export let seq;

const LV=getContext('LV');
const jump=(basket,ck,line)=>{
    const address=makeChunkAddress(ck,line-ck.line);
    LV.insertAddress(basket+':'+address,seq);
}
let prev='';
for (let i=0;i<links.length;i++) {
    if (links[i].ck.bk.caption==prev)links[i].ck.bk.caption='';
    else prev=links[i].ck.bk.caption;
    console.log(links[i].ck.bk.caption)
}
</script>
{#each links as link}
<Button title={link.ck.caption} className="clickable backlink" onclick={()=>jump(link.basket,link.ck,link.line)}>
{link.ck.bk.caption}</Button>{' '}
{/each}
