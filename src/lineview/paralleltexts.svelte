<script>
import {getContext,onMount} from 'svelte';
import InlineText from '../painters/inlinetext.svelte';
import Button from '../comps/button.svelte';
export let ptk
export let seq
export let line;
export let parallels_linediff;
export let division;
//sort by lastest selected parallel ptk
const items=parallels_linediff.map(it=>[it[0],it[1], ptk.parallels[it[0].name]||0]).sort((a,b)=>b[2]-a[2])
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

{#each items as [pptk,linediff,datevalue] }
{#if datevalue}
<br/><Button onclick={()=>addDivision(pptk.name,line,linediff)} className='parallelptk clickable'>{pptk.humanName(true)}</Button>
{#await pptk.loadLines([[line+linediff,line+linediff+1]])}
Loading...
{:then}
<InlineText extraclass='parallel' active=true ptk={pptk} {seq} text={pptk.getLine(line+linediff)}/>
{/await}
{/if}
{/each}