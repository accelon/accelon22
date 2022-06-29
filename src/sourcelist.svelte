<script>
import {editing,sources} from "./ts/store.ts"
</script>
<div>
{#each $sources as source,idx}
<div class:active_clickable={idx==$editing} class="clickable" on:click={()=>editing.set(idx)}>{source.name}</div>
{/each}
</div>
<style>
</style>