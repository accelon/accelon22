<script>
export let ptk,action,items=[],seq;
import GuideFilter from './guidefilter.svelte'
import ExcerptHeading from '../ownerdraw/excerptheading.svelte';
import Inlinetext from '../painters/inlinetext.svelte';
let from=0;
$: displayitems=items.slice(from,from+5);
const less=()=>{
    from-=5;
    if (from<0) from=0;
}
const more=()=>{
    if (from+5<items.length) {
        from+=5;    
    }
}
</script>
{#if !action}
<GuideFilter {ptk} {seq}/>
{:else}
{ptk.template.humanChoice(action)}
<span on:click={()=>less()} class="clickable">{from+1}/</span>
<span on:click={()=>more()} class="clickable">{items.length}</span>
{#each displayitems as item}
<div><ExcerptHeading {ptk} {seq} {...item.ck} lineoff={item.lineoff} tagname="ck"/>
<span class="clickable">{ptk.template.onChunkCaption(item.ck.id)}</span>
<Inlinetext text={item.text} {ptk} {seq}/></div>
{/each}



{/if}
