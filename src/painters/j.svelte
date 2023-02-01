<script>
import {getContext} from 'svelte'
import Button from '../comps/button.svelte';
import {parseAction} from 'ptk'
export let seq;
export let after;
export let innertext;
export let value;
let show=false;
const humanCaption=address=>{
    const eleidarr=parseAction(address);
    const last=eleidarr[eleidarr.length-1];
    return last[1]?last[1]:last[0];
}
const LV=getContext('LV');
const jump= ()=>{
    LV.insertAddress(value,seq);
}
</script>   
{#if after || (!innertext&&!after)}
<Button onclick={jump}>{humanCaption(value)}</Button>
{/if}