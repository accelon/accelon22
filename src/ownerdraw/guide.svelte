<script>
import {getContext} from 'svelte';
export let ptk,action,items=[],seq;
import GuideFilter from './guidefilter.svelte'
import Button from '../comps/button.svelte';
import Inlinetext from '../painters/inlinetext.svelte';
import {makeChunkAddress} from 'ptk';
const LV=getContext('LV');
import {renderOfftext} from 'ptk';
import {getExtraPainter} from '../ts/painters.ts'
import GuideLineMenu from './guidelinemenu.svelte';

let from=0, ready=false , now={};
const next=()=>{
    if (from<items.length) from++;
}
const prev=()=>{
    if (from>0) from--;
}
const open=()=>{
    const lineoffset=now.line-now.ck.line;
    const address=makeChunkAddress(now.ck,lineoffset);

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
const oncaption=()=>{}
$: fetchLine(from);
</script>
{#if !action}
<GuideFilter {ptk} {seq}/>
{:else if ready}
{ptk.template.humanChoice(action)}
<span class="toolbar">
<Button onclick={prev}>{from+1}/</Button>
<Button onclick={next}>{items.length}</Button>
<Button onclick={oncaption}>{ptk.template.onChunkCaption(now?.ck?.id)}</Button>
</span>

<div>
<Inlinetext text={ptk.getLine(now?.line)} {ptk} {seq}/>
{#if now?.record.length==0}
<GuideLineMenu {activelinemenus} line={now?.rec}/><Button onclick={open} className="ck clickable">{now?.ck?.caption}</Button>
{:else}
{#each now?.record as rec}<!-- multiple line  //-->
<div><Inlinetext text={ptk.getLine(rec)} {ptk} {seq}/>
<GuideLineMenu {activelinemenus} line={rec}/>
</div>
{/each}
{/if}
</div>
{/if}
