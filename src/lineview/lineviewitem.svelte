<script>
import {getLVStyle} from '../ts/styling.ts'
import Offtags from './offtags.svelte'
import {Ownerdraws} from '../ownerdraw/ownerdraw.ts';
import InlineText from '../painters/inlinetext.svelte';
import ActiveLineMenu from './activelinemenu.svelte';
import {renderOfftext} from 'ptk';

export let edge;
export let depth;
export let text;
export let key;
export let sponser='';
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
let units;
$: [units]=renderOfftext(text,{line});
$: explainword = (active && units.filter(ru=>ru.text==activeword).length>0)?activeword:'' ;
</script>
<div {key} style={"contain: content;"+getLVStyle(depth,edge)} 
 class="lineviewitem" class:highlightline={highlight}  class:activeline={active} >
{#if ownerdraw}
<svelte:component this={Ownerdraws[ownerdraw.painter]} {...ownerdraw.data} {seq} {dividx} />
{:else}
{#if sponser}<span class="sponser" {sponser}></span>{/if}{#if idx>-1}<br/>{/if}<InlineText {ptk} {line} {seq} {units} {active} {activeword} before={Offtags} after={Offtags}/>
{#if active}<ActiveLineMenu {explainword} {key} {lva} {ptk} {seq} {line} {dividx} division={lva.getNode(dividx)}/>{/if}
{/if}
</div>
