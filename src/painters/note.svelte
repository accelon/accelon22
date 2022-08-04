<script>
import {onMount} from 'svelte'
import {renderOfftext} from 'ptk';
import InlineText from './inlinetext.svelte';

export let text;
export let ptk;
export let tagname;
export let after;
$: notetext='';
onMount(async ()=>{
	if (!after) return;
	notetext=await ptk.inlineNote(tagname,text);
})
</script>
{#if notetext}
<span class="inlinenote"><InlineText {ptk} text={notetext}/></span>
{/if}