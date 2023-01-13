<script>
export let from;
export let last;
const PAGESIZE=5;
const prev=()=>{
    from-=PAGESIZE
    if (from<0) from=0;
}
const next=()=>{
    if (from+5 < last) from+=PAGESIZE;
}
</script>
{#if last>PAGESIZE}
<span class="clickable pagingbutton" on:click={()=>prev()}>{from+1}/</span><span 
    class="clickable pagingbutton"  on:click={()=>next()}>{last}</span>
{/if}