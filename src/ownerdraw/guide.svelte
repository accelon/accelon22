<script>
import {getContext} from 'svelte';
export let ptk,action,items=[],seq;
import GuideFilter from './guidefilter.svelte'
import {Painters} from '../painters/painters.ts'

import Inlinetext from '../painters/inlinetext.svelte';
import {makeChunkAddress} from 'ptk';
const LV=getContext('LV');
import {renderOfftext} from 'ptk';
import {getExtraPainter} from '../ts/painters.ts'

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
let activelinemenus=[];

const fetchLine=async ()=>{
    ready=false;
    now=items[from];
    if (!now) return;
    await ptk.loadLines([now.line,now.line+now.size]);
    //make all line active
    for (let i=now.line;i<now.line+now.size;i++) {
        const text=ptk.getLine(i)
        const [units,ot]=renderOfftext(text,{line:i});
        const _activelinemenu=getExtraPainter(ptk,ot,'activelinemenu');
        if (_activelinemenu.length) {
            activelinemenus[i]=_activelinemenu;
        }
    }
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
<span class="clickable">{ptk.template.onChunkCaption(now?.ck?.id)}</span>
</span>

<div>
<span class="clickable openexcerpt" on:click={()=>open()}/>
    <Inlinetext text={ptk.getLine(now?.line)} {ptk} {seq}/>
{#each now?.record as rec}
<div><Inlinetext text={ptk.getLine(rec)} {ptk} {seq}/>
{#if activelinemenus[rec]}
{#each activelinemenus[rec] as menuitem}
<svelte:component this={Painters[menuitem.painter]} {seq} {...menuitem.data} line={rec}/>
{/each}
{/if}
</div>
{/each}
</div>
{/if}
