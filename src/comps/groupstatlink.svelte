<script>
export let caption;
export let count;
export let idx;
export let onclick;
</script>
<span class="clickable" on:click={()=>onclick(idx)}>
{' '+caption}<span  class="hitcount">{count}</span></span>