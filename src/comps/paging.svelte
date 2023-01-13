<script>
export let from;
export let items;
const PAGESIZE=5;
const prev=()=>{
    from-=PAGESIZE
    if (from<0) from=0;
}
const next=()=>{
    if (from+5 < items.length) from+=PAGESIZE;
}
</script>
{#if items.length>PAGESIZE}
<span class="clickable pagingbutton" on:click={()=>prev()}>{from+1}/</span><span 
    class="clickable pagingbutton"  on:click={()=>next()}>{items.length}</span>
{/if}