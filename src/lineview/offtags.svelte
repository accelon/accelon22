<script>
import Offtag from './offtag.svelte'
export let ntags;
export let after;
export let ru;
export let ptkname;
export let firstchild;
</script>
{#each ntags as ntag}
<Offtag {ptkname} {firstchild} offtext={ru.offtext} {ntag} {after}/>
{/each}