<script>
export let ptk;
export let items=[];
export let itemRenderer;
const ITEMPERPAGE=5;
export let showcount=ITEMPERPAGE;
const showmore=()=>{
	showcount+=ITEMPERPAGE;
}

$: displayitems=items.slice(0,showcount);
$: console.log(items)
</script>

{#each displayitems as item}
{#if itemRenderer}
<svelte:component this={itemRenderer} {ptk} {...item}/>
{:else}
{' '+item[0]}({item[1]})
{/if}
{/each}
{#if showcount<items.length}<span class="clickable" 
on:click={()=>showmore()}>+{items.length-showcount}</span>{/if}
