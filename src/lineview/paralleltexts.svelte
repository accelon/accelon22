<script>
import {getContext} from 'svelte';
import InlineText from '../painters/inlinetext.svelte';
export let ptk
export let seq
export let line;
export let parallels_linediff;
export let division;
const LV=getContext('LV');
const addDivision=(pptkname,line,linediff)=>{
//create a division under me and set highlight line
    const highlightline = line-division.first;
    let from=highlightline;
    if (from<0) from =0;
    const address=division.action+'>'+from+':'+highlightline;
    LV.insertAddress(pptkname+':'+address,seq);
    //keep active line, easier to toogle division
}
</script>

{#each parallels_linediff as [pptk,linediff] }
{#if ptk.parallels[pptk.name]}
<br/><span on:click={()=>addDivision(pptk.name,line,linediff)} class={'parallelptk clickable'}>{pptk.humanName()}</span>
<InlineText active=true ptk={pptk} {seq} text={pptk.getLine(line+linediff)}/>
{/if}
{/each}