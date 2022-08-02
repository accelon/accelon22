<script>
import { createEventDispatcher,setContext } from 'svelte';
import {getLVStyle} from '../ts/styling.ts'
import Offtags from './offtags.svelte'
import InlineText from '../painters/inlinetext.svelte';
import {Painters} from '../painters/painters.ts';

export let edge;
export let depth;
export let text;
export let key;
export let seq;
export let ptkname;
export let firstchild;
export let lva;
export let ownerdraw;
const dispatch = createEventDispatcher();
// const clickHandlers={note};

const insertAddress=(address)=>{
	dispatch('insert',{address,seq})
}
const remove=(lva)=>{
	dispatch('remove',lva)
}

setContext('LV',{ ptkname, seq, insertAddress, remove, lva });

</script>
<div {key} style={"contain: content;"+getLVStyle(depth,edge)}>
{#if ownerdraw}
<svelte:component this={Painters[ownerdraw.painter]} {...ownerdraw.data} />
{:else}
<InlineText {ptkname} {firstchild} {text} before={Offtags} after={Offtags}/>
{/if}
</div>