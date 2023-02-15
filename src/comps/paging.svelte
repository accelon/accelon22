<script>
export let from=0;
export let last;
import Button from './button.svelte';
export let count=5;
const prev=()=>{
    from-=count
    if (from<0) from=0;
}
const next=()=>{
    if (from+count < last) from+=count;
}
</script>
<Button onclick={prev}>{from+1}/</Button><Button onclick={next}>{last}</Button>