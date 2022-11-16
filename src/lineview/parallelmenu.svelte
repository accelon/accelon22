<script>
import {getContext} from 'svelte';

export let ptk;
export let update;
export let division;
const parallels=division?.getParallelWithDiff();
const LV=getContext('LV');

const  toggleParallel=async (e,ptkname,onoff)=>{
    setTimeout(async function(){
        if (onoff) await division.loadParallel(ptkname);
        ptk.parallels[ptkname]=onoff;
        LV.setParallel(ptk.name,ptkname,onoff);
        update();
    });
    e.stopPropagation();
}
</script>
{#each parallels as [pptk] }
<span class='clickable' class:closelink={ptk.parallels[pptk.name]} 
on:click={e=>toggleParallel(e,pptk.name,!ptk.parallels[pptk.name])}>{pptk.humanName()+' '}</span>
{/each}