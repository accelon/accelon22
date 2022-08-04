<script>
import Offtag from './offtag.svelte'
export let ntags;
export let after;
export let ru;
export let ptk;

</script>
{#each ntags as ntag}
<Offtag {ptk} offtext={ru.offtext} {ntag} {after}/>
{/each}