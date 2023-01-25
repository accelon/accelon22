<script>
import Button from '../comps/button.svelte';
export let caption;
export let count;
export let idx;
export let onclick;
</script>
<Button onclick={()=>onclick(idx)}>
{' '+caption}<span class="hitcount">{count}</span></Button>