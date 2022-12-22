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

</script>

{#each displayitems as item}
<svelte:component this={itemRenderer} {ptk} {...item}/>
{/each}
{#if showcount<items.length}<span class="clickable" 
on:click={()=>showmore()}>+{items.length-showcount}</span>{/if}
