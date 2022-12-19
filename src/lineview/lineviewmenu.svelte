<script>
import {getContext} from 'svelte';
import {textClasses,_} from '../ts/textout.ts';

export let item; // seq 第幾行 , idx 第幾個 division
export let ptk ,lva;
const LV=getContext('LV');
$: caption='';
$: if (item.idx!==-1) caption=ptk?.getHeading(item.line+1).caption; //readable
$: division=lva.getNode(item.idx);

</script>
<span class='lineviewmenu'>
{#if caption && !division?.singleton}<!-- navigating a reading segment and not singleton division-->
{#if LV.canless(division)}<span class='clickable lesstext' on:click={()=>LV.onless(division)}></span>{/if}
{#if LV.canmore(division)}<span class='clickable moretext' on:click={()=>LV.onmore(division)}></span>{/if}
{#if LV.canprev(division)}<span class='clickable' on:click={()=>LV.onprev(division)}>{division?.from+1}/</span>{/if}
{#if LV.cannext(division)}<span class='clickable' on:click={()=>LV.onnext(division)}>{division.last-division.first}</span>{/if}

<span class={'clickable lineviewheading'+textClasses(ptk)}
 on:click={()=>LV.onpromote(item.idx)}>{_(caption,ptk?.lang)}</span>
{/if}
<span class='clickable'on:click={()=>LV.onremove(division)}>⨯</span>
</span>

