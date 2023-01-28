<script>
/* support null ^f , and ^f【innertext】
*/
import {getContext} from 'svelte'
import InlineText from './inlinetext.svelte';
import Button from '../comps/button.svelte';

export let ptk;
export let masterid;
export let line;
export let seq;
export let after;
export let innertext; 
const LV=getContext('LV');
const shownote= ()=>{
    LV.insertAddress(ptk.footNoteAddress(masterid,line),seq);
}
</script>
<!-- if innertext has length, show after, otherwise show before //-->
{#if after || (!innertext&&!after)}
<Button className="clickable footnotebutton" onclick={shownote}>{masterid}</Button>
{/if}