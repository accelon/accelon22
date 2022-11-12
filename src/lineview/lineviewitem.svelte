<script>
import {getLVStyle} from '../ts/styling.ts'
import Offtags from './offtags.svelte'
import InlineText from '../painters/inlinetext.svelte';
import {Painters} from '../painters/painters.ts';
import ActiveLineMenu from './activelinemenu.svelte'
export let edge;
export let depth;
export let text;
export let key;
export let line;
export let lva; 
export let seq; //seq in lineview
export let dividx;    
export let ownerdraw;
export let ptk;
export let highlight;
export let active;

</script>
<div {key} style={"contain: content;"+getLVStyle(depth,edge)} 
 class="lineviewitem" class:highlightline={highlight}  class:activeline={active} >
{#if ownerdraw}
<svelte:component this={Painters[ownerdraw.painter]} {...ownerdraw.data} {seq} {dividx} />
{:else}
<InlineText {ptk} {line} {seq} {text} {active} before={Offtags} after={Offtags}/>
{#if active}<ActiveLineMenu {key} {lva} {ptk} {seq} {line} {dividx} division={lva.getNode(dividx)}/>{/if}
{/if}
</div>
