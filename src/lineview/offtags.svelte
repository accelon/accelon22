<script>
import Offtag from './offtag.svelte'
export let ntags;
export let after;
export let ru;
export let ptk;
export let seq;
$: ntags= (ru && ru.tagsOf(after));
</script>
{#each ntags as ntag}
<Offtag {ptk} offtext={ru.offtext} {ntag} {after} {seq}/>
{/each}