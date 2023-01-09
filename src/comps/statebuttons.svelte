<script>
import Statebutton from './statebutton.svelte';
export let items=[];
export let choices=[];
export let unselectable=false;
export let refresh=0;
const choose=(prefix,selectedIndex)=>{
    const toadd=prefix+selectedIndex;
    choices=choices.filter(it=>!it.startsWith(prefix));
    if (selectedIndex!==-1) {
        choices.push(toadd);
    }
}
const getSelected=(prefix)=>{
    let at=-1;
    for (let i=0;i<choices.length;i++) {
        if (choices[i].startsWith(prefix)) at=i;
    }
    return at;
}
</script>
{#key refresh}
{#each items as item}
<Statebutton {...item} selectedIndex={getSelected(item.prefix)} {unselectable} onclick={n=>choose(item.prefix,n)}/>
{/each}
{/key}