<script>
import {getContext} from 'svelte';

export let ptk;
export let update;
export let division;
const parallels=division?.getParallelWithDiff();
const LV=getContext('LV');

const  toggleParallel=async (e,ptkname,onoff)=>{
    setTimeout(async function(){
        const datevalue=(new Date()).valueOf();
        if (onoff) await division.loadParallel(ptkname);
        if (ptk.parallels[ptkname]) ptk.parallels[ptkname]=0;
        else ptk.parallels[ptkname]=datevalue;

        LV.setParallel(ptk.name,ptkname, datevalue);
        update();
    });
    e.stopPropagation();
}
</script>
{#each parallels as [pptk] }
<span class='clickable' class:closelink={ptk.parallels[pptk.name]} 
on:click={e=>toggleParallel(e,pptk.name)}>{pptk?.name+' '}</span>
{/each}