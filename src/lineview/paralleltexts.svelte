<script>
import InlineText from '../painters/inlinetext.svelte';
export let ptk
export let seq
export let line;
export let parallels;
export let updatecount;
$: console.log('update count',updatecount)
</script>

{#each parallels as [pptk,linediff] }
{#if ptk.parallels[pptk.name]}
<br/><span class='ptkHuman clickable'>{pptk.humanName()}</span> <InlineText active=true ptk={pptk} {seq} text={pptk.getLine(line+linediff)}/>
{/if}
{/each}