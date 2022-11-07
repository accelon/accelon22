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
export let firstchild;
export let ownerdraw;
export let ptk;
export let active;
</script>
<div {key} style={"contain: content;"+getLVStyle(depth,edge)} class:activeline={active}>
{#if ownerdraw}
<svelte:component this={Painters[ownerdraw.painter]} {...ownerdraw.data} {seq} />
{:else}
<InlineText {ptk} {seq} {firstchild} {text} before={Offtags} after={Offtags}/>
{/if}
</div>