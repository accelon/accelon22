<script>
import {onMount} from 'svelte'
import {usePtk,renderOfftext} from 'ptk';
import InlineText from './inlinetext.svelte';

export let text;
export let ptkname;
export let tagname;
export let after;
$: notetext='';
onMount(async ()=>{
	if (!after) return;
	const ptk=usePtk(ptkname);
	notetext=await ptk.inlineNote(tagname,text);
})
</script>
{#if notetext}
<span class="inlinenote"><InlineText {ptkname} text={notetext}/></span>
{/if}