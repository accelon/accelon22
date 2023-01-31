<script>
import {getContext} from 'svelte'
import {makeChunkAddress} from 'ptk';
import Button from '../comps/button.svelte';
export let ptk;
export let line;
export let seq;
export let after;
export let innertext;
export let value;
let showlink=false;
const LV=getContext('LV');
const jump=(ck,line)=>{
    const address=makeChunkAddress(ck,line-ck.line);
    LV.insertAddress(address,seq);
}
$: links=ptk.foreignLinksAtTag('n',line);

</script>   
{#if after || (!innertext&&!after)}
<Button className={links.length?'clickable n':'n'} 
onclick={()=>showlink=!showlink}>{value}</Button>
{#if links.length}<span class='foreignlink'>{links.length}</span>{/if}
{#if showlink &&links.length}
{#each links as link}
<Button className="clickable backlink" onclick={()=>jump(link.ck,link.line)}>
{link.ck.caption}({link.ck.bk.caption})</Button>{' '}
{/each}
{/if}
{/if}