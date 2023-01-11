<script>
import {getContext} from 'svelte';
export let ptk,action,items=[],seq;
import GuideFilter from './guidefilter.svelte'
import Inlinetext from '../painters/inlinetext.svelte';
import {makeChunkAddress} from 'ptk';
const LV=getContext('LV');

let from=0, ready=false , now={};
const next=()=>{
    if (from<items.length) from++;
}
const prev=()=>{
    if (from>0) from--;
}
const open=()=>{
    const lineoffset=now.line-now.ck.line;

    const address=makeChunkAddress(now.ck,now.ck.id,lineoffset);

    LV.insertAddress(address,seq);
}
const fetchLine=async line=>{
    ready=false;
    now=items[from];
    if (!now) return;
    await ptk.loadLines([now.line,now.line+now.size]);
    ready=true;
}
$: fetchLine(from);
</script>
{#if !action}
<GuideFilter {ptk} {seq}/>
{:else if ready}
{ptk.template.humanChoice(action)}
<span class="toolbar">
<span on:click={()=>prev()} class="clickable">{from+1}/</span>
<span on:click={()=>next()} class="clickable">{items.length}</span>
</span>
<div class="lineviewmenu">
<span class="clickable">{ptk.template.onChunkCaption(now?.ck?.id)}</span>
</div>

<div>
<span class="clickable openexcerpt" on:click={()=>open()}/>
    <Inlinetext text={ptk.getLine(now?.line)} {ptk} {seq}/>
{#each now?.record as rec}
<div><Inlinetext text={ptk.getLine(rec)} {ptk} {seq}/></div>
{/each}
</div>
{/if}
