<script>
import {getContext} from 'svelte'
import InlineText from './inlinetext.svelte';
import Button from '../comps/button.svelte';

export let ptk;
export let masterid;
export let line;
export let seq;
let show=false;
$: notetext='';
const LV=getContext('LV');
const shownote= ()=>{
    LV.insertAddress(ptk.footNoteAddress(masterid,line),seq);
}

</script>
{#key notetext}
<Button className="footnotebutton" on:click={shownote}>{masterid}</Button>
{#if show}
<div class="footnotepopup"><span class="footnote"><InlineText {ptk} text={notetext}/></span></div>
{/if}
{/key}