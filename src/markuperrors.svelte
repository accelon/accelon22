<script>
import {editingErrors,scrollToLine} from "./ts/editor.ts";
import Button from './comps/button.svelte';

</script>

<div class="markuperrors">
{#each $editingErrors as item}
<div><Button className="fileerror" 
	onclick={()=>scrollToLine.set(-item.line)}>{item.msg}</Button>
{#if item.prev}
<Button onclick={()=>scrollToLine.set(-item.prev)}>⤴</Button>
{/if}
</div>
{/each}
</div>
<style>
	.markuperrors {color: red}
</style>