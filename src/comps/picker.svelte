<script>
import Button from '../comps/button.svelte';
export let column;
const p='';
const getPicker=(keys,values,parent='')=>{
    const out=[]
    for (let i=0;i<keys.len();i++) {
        const key=keys.get(i);
        const suffix='0'.repeat(key.length-parent.length-1);
        if (key.startsWith(parent) &&  key.endsWith(suffix)) {
            out.push([key,values[i]]);
        }
    }
    return out;
}
const setpicker=()=>{}
$: items=getPicker(column.keys, column.fieldvalues[0],p)
</script>
{#each items as item}
 <Button onclick={setpicker}>{item[1]}</Button>{' '}
{/each}