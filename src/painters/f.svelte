<script>
import {onMount} from 'svelte'
import InlineText from './inlinetext.svelte';
export let ptk;
export let tagname;
export let before;
export let masterid;
export let line;
let show=false;
$: notetext='';
const shownote= (e)=>{
    ptk.footNote(tagname,masterid,line).then(res=>{
        notetext=res.join('')
        show=!show;
        console.log(notetext)
    });
    e.stopPropagation();
}

</script>
{#key notetext}
{#if show}
<div class="footnotepopup"><span class="footnote"><InlineText {ptk} text={notetext}/></span></div>
{:else}
<span class="footnotebutton clickable" on:click={(e)=>shownote(e)}>{masterid}</span>
{/if}
{/key}