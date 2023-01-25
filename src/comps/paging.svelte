<script>
export let from;
export let last;
const PAGESIZE=5;
import Button from './button.svelte';

const prev=()=>{
    from-=PAGESIZE
    if (from<0) from=0;
}
const next=()=>{
    if (from+5 < last) from+=PAGESIZE;
}
</script>
{#if last>PAGESIZE}
<Button onclick={prev}>{from+1}/</Button><Button onclick={next}>{last}</Button>
{/if}