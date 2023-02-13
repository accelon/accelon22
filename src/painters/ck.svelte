<script>

import Jump_target from './jump_target.svelte'
import Button from '../comps/button.svelte';
export let ptk;
export let line;
export let seq;
export let after;
export let innertext;
export let value;
export let tagname;

let showlink=false;

$: links=ptk.foreignLinksAtTag(tagname,line);
</script>
{#if after || (!innertext&&!after)}
{#if links.length}<span class='foreignlink'>{links.length}</span>{/if}
<Button className={links.length?'clickable '+tagname:tagname} 
onclick={()=>showlink=!showlink}>{' '+value+' '}</Button>

{#if showlink&&links.length}<span class="toolbar"><Jump_target {links} {seq}/></span>
{/if}

{/if}