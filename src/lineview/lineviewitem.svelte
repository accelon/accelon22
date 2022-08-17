<script>
import {getLVStyle} from '../ts/styling.ts'
import Offtags from './offtags.svelte'
import InlineText from '../painters/inlinetext.svelte';
import {Painters} from '../painters/painters.ts';

export let edge;
export let depth;
export let text;
export let key;
export let seq; //seq in lineview
export let remain;
export let onmore;
export let ptkname;
export let firstchild;
export let lva;
export let ownerdraw;
export let ptk;
</script>
<div {key} style={"contain: content;"+getLVStyle(depth,edge)}>
{#if ownerdraw}
<svelte:component this={Painters[ownerdraw.painter]} {...ownerdraw.data} {seq} />
{:else}
<InlineText {ptk} {seq} {firstchild} {text} before={Offtags} after={Offtags}/>
{/if}
{#if remain}<span class="clickable" on:click={()=>onmore(seq)}>+{remain}</span>{/if}
</div>