<script>
//on:click={()=>LV.onpromote(item.idx)}
import {makeChunkAddress} from 'ptk'
import {getContext} from 'svelte';
import {_} from '../ts/textout.ts'
export let idx;
export let line;
export let onHide;
export let ptk;
const LV=getContext('LV');
const ck=ptk.nearestChunk(line);
const items=ptk.neighborChunks( ck.at);
const goChunk=(n)=>{
    const ck=items[n];
    if (ck.line==line) {
        console.log('promote')
        // LV.promote(idx);
    } else {
        const addr=makeChunkAddress(ck);
        LV.changeAddress(addr,idx);
        onHide&&onHide();
    }

}
</script>
<div class="chunkmenu">
<span on:click={onHide} class="bk closebutton">{_(ck.bk.caption)}</span>
{#each items as item,n}
<div aria-hidden="true" class={'clickable bgdepth'+item.depth}
   on:click={()=>goChunk(n)}>{_(item.caption)}{#if item.line==line}✔{/if}</div>
{/each}
</div>
<style>
.closebutton {width:100%;display:block}
</style>