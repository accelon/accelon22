<script>
export let from=0;
export let last;
import Button from './button.svelte';

const prev=()=>{
    from-=1
    if (from<0) from=0;
}
const next=()=>{
    if (from+5 < last) from+=1;
}
</script>
<Button onclick={prev}>{from+1}/</Button><Button onclick={next}>{last}</Button>