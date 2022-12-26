<script>
import Offtag from './offtag.svelte'
import {Painters} from '../painters/painters.ts'
export let ntags;
export let after;
export let ru;
export let ptk;
export let seq;
$: ntags= (ru && ru.tagsOf(after));
// $: if (ru.extra) console.log(ru.extra.painter, ru.extra.data)
</script>
{#each ntags as ntag}
<Offtag {ptk} offtext={ru.offtext} {ntag} {after} {seq}/>
{/each}{#if ru?.extra && after}<svelte:component {seq} this={Painters[ru.extra.painter]} {...ru.extra.data} />{/if}