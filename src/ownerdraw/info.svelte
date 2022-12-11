<script>
import Picker from "../comps/picker.svelte";
export let ptk;
export let items=[];
const getPicker=()=>{
    const pickercol=ptk.attributes.picker;
    if (!pickercol) return '';
    const col=ptk.columns[pickercol];
    return col;    
}
$: column=getPicker();
</script>
<Picker {column}/>
{#each items as item}
{item.text}
{/each}