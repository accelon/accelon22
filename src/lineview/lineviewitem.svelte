<script>
import {getLVStyle} from '../ts/styling.ts'
import Offtags from './offtags.svelte'
import {Ownerdraws} from '../ownerdraw/ownerdraw.ts';
import InlineText from '../painters/inlinetext.svelte';
import ParaChunk from '../painters/parachunk.svelte';

import ActiveLineMenu from './activelinemenu.svelte';
import {renderOfftext} from 'ptk';
import {getExtraPainter} from '../ts/painters.ts'

export let edge;
export let depth;
export let text;
export let key;
export let sponsor='';
export let parallels;
export let line;
export let idx; //-1 top line
export let lva; 
export let seq; //seq in lineview
export let dividx;    
export let ownerdraw;
export let ptk;
export let activeword;
export let highlight;
export let active;
let units, activelinemenu,extra;
let linestyle='';//first tag at bol
const render=(text,line)=>{
    const [units,ot]=renderOfftext(text,{line});
    extra=getExtraPainter(ptk,ot,'backref',true)
    .concat(getExtraPainter(ptk,ot,'backlink'))
    activelinemenu=getExtraPainter(ptk,ot,'activelinemenu');
    if (units.length && units[0].tags.length) {
        linestyle=(ot.tags[ units[0].tags[0]]?.name)||'';
        if (linestyle)linestyle=' '+linestyle+'_div';
    } else linestyle='';
    return units;
}
$: units=render(text,line);
//do not pass units to InlineText, so that it will call renderOfftext again
$: explainword = (active && units.filter(ru=>ru.text==activeword).length>0)?activeword:'' ;
</script>
<div {key} style={"contain: content;"+getLVStyle(depth,edge)} 
 class={"lineviewitem "+ptk?.name+linestyle} class:highlightline={highlight}  class:activeline={active} >
{#if ownerdraw}
<svelte:component this={Ownerdraws[ownerdraw.painter]} {...ownerdraw.data} {seq} {dividx} />
{:else}
{#if sponsor}<InlineText {ptk} text={sponsor}/>{/if}
{#if parallels?.length}<ParaChunk {seq} items={parallels}/>{/if}
{#if idx>-1}
<br/>{/if}<InlineText {ptk} {line} {seq} {extra} {text} {active} {activeword} before={Offtags} after={Offtags}/>
{#if active}<ActiveLineMenu {explainword} {key} {lva} {ptk} 
{seq} {line} {dividx} {activelinemenu} 
 division={lva.getNode(dividx)}/>{/if}
{/if}
</div>
