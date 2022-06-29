<script>
import {scrollToLine,editingtoc,scrollY} from './ts/store.ts'
const goline=line=>scrollToLine.set(line);
</script>

{#each $editingtoc as tocitem}
<div class="tocitem clickable" class:upper={$scrollY>tocitem.line}
     on:click={()=>goline(tocitem.line)}>{tocitem.text}</div>
{/each}
<style>
	.tocitem{text-align: right;}
	.upper {opacity:0.2}
</style>