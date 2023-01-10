<script>
export let ptk,action,items=[],seq;
import GuideFilter from './guidefilter.svelte'
// import ExcerptHeading from '../ownerdraw/excerptheading.svelte';
import Inlinetext from '../painters/inlinetext.svelte';
let from=0;
const next=()=>{
    if (from<items.length) from++;
}
const prev=()=>{
    if (from>0) from--;
}
$: now=items[from];
const open=()=>{
    
}
</script>
{#if !action}
<GuideFilter {ptk} {seq}/>
{:else}
{ptk.template.humanChoice(action)}
<span class="toolbar">
<span on:click={()=>prev()} class="clickable">{from+1}/</span>
<span on:click={()=>next()} class="clickable">{items.length}</span>
</span>
<div class="lineviewmenu">
<span class="clickable">{ptk.template.onChunkCaption(now.ck.id)}</span>
</div>

<div>
<span class="clickable openexcerpt" on:click={()=>open()}/>
    <Inlinetext text={now.text} {ptk} {seq}/>
{#each now.record as rec}
<div><Inlinetext text={ptk.getLine(rec)} {ptk} {seq}/></div>
{/each}
</div>
{/if}
