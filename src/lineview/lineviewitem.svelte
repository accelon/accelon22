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
export let lva; 
export let seq; //seq in lineview
export let dividx;    
export let firstchild;
export let ownerdraw;
export let ptk;
export let highlight;
export let active;

</script>
<div {key} style={"contain: content;"+getLVStyle(depth,edge)} class:highlightline={highlight}>
{#if ownerdraw}
<svelte:component this={Painters[ownerdraw.painter]} {...ownerdraw.data} {seq} />
{:else}
<InlineText {ptk} {seq} {firstchild} {text} {active} before={Offtags} after={Offtags}/>
{#if active}<ActiveLineMenu {key} {lva} {ptk} {seq} {dividx} division={lva.getNode(dividx)}/>{/if}
{/if}
</div>