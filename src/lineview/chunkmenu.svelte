<script>
//on:click={()=>LV.onpromote(item.idx)}
import {makeChunkAddress} from 'ptk'
import {getContext} from 'svelte';
export let idx;
export let line;
export let onHide;
export let ptk;
const LV=getContext('LV');
const ck=ptk.getNearestChunk(line);
const items=ptk.getNeighborChunk( ck.at);
const goChunk=(n)=>{
    const ck=items[n];
    if (ck.line==line) {
        LV.promote(idx);
    } else {
        const addr=makeChunkAddress(ck);
        LV.changeAction(addr,idx);
        onHide&&onHide();
    }

}
</script>
<div class="chunkmenu">
{#each items as item,n}
<div class:clickable={ ((n+1)*2!=items.length+1) || LV.canpromote(idx)}
  class:lineviewheading={(n+1)*2==items.length+1}
   on:click={()=>goChunk(n)}>{item.caption}</div>
{/each}
</div>

<style>
.promote {float:right}
</style>