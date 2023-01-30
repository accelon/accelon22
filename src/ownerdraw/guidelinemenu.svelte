<script>
import {Painters} from '../painters/painters.ts'
export let activelinemenus;
export let line;
export let seq;

</script>
{#if activelinemenus[line]}
{#each activelinemenus[line] as menuitem}
<svelte:component this={Painters[menuitem.painter]} {seq} {...menuitem.data} line={line}/>
{/each}
{/if}