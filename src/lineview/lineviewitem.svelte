<script>
import { createEventDispatcher,setContext } from 'svelte';
import {getLVStyle} from '../ts/styling.ts'
import Offtags from './offtags.svelte'
import InlineText from '../painters/inlinetext.svelte';
import {Painters} from '../painters/painters.ts';
import {makeAddress} from 'ptk';
export let edge;
export let depth;
export let text;
export let key;
export let seq; //seq in lineview
export let remain;
export let ptkname;
export let firstchild;
export let lva;
export let ownerdraw;
const dispatch = createEventDispatcher();

const insertAddress=(address)=>{
	dispatch('insert',{address,seq})
}
const insertAction=(action)=>{
	insertAddress(makeAddress(ptkname,action));
}
const remove=(lva)=>{
	dispatch('remove',lva)
}
const more=()=>{
	dispatch('more',seq);
}
setContext('LV',{ ptkname, seq, insertAction, insertAddress, remove, lva });

</script>
<div {key} style={"contain: content;"+getLVStyle(depth,edge)}>
{#if ownerdraw}
<svelte:component this={Painters[ownerdraw.painter]} {...ownerdraw.data} />
{:else}
<InlineText {ptkname} {firstchild} {text} before={Offtags} after={Offtags}/>
{/if}
{#if remain}<span class="clickable" on:click={()=>more()}>+{remain}</span>{/if}
</div>