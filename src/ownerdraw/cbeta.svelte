<script>
export let ptk;
import TaishoGoto from './taishogoto.svelte'
</script>
{#if ptk.name=='cb-t'}
<TaishoGoto {ptk}/>
{/if}
{#if ptk.name=='yinshun'}YINSHUN{/if}
<style>
</style>