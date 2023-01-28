<script>
import {getContext} from 'svelte'
import InlineText from './inlinetext.svelte';
import Button from '../comps/button.svelte';
export let ptk;
export let line;
export let seq;
export let after;
export let innertext;
export let value;
let show=false;
const LV=getContext('LV');
const jump= ()=>{
    LV.insertAddress(value,seq);
}
</script>   
{#if after || (!innertext&&!after)}
<Button onclick={jump}>{value}</Button>
{/if}