<script>
import {editingErrors,scrollToLine} from "./ts/editor.ts";
</script>

<div class="markuperrors">
{#each $editingErrors as item}
<div><span class="clickable fileerror" 
	on:click={()=>scrollToLine.set(-item.line)}>{item.msg}</span>
{#if item.prev}
<span class="clickable" on:click={()=>scrollToLine.set(-item.prev)}>⤴</span>
{/if}
</div>
{/each}
</div>
<style>
	.markuperrors {color: red}
</style>