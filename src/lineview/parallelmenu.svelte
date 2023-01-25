<script>
import {getContext} from 'svelte';

export let ptk;
export let update;
export let division;
const parallels=division?.getParallelWithDiff();
const LV=getContext('LV');

const  toggleParallel=async (e,ptkname)=>{
    setTimeout(async function(){
        // await division.loadParallel(ptkname);
        const v= (ptk.parallels[ptkname])?0:(new Date()).valueOf();
        ptk.parallels[ptkname]=v;           // parallel setting in individual ptk
        LV.setParallel(ptk.name,ptkname,v); // update the localstorage 
        update();
    });
    e.stopPropagation();
}
</script>
{#each parallels as [pptk] }
<span class='clickable' class:closelink={ptk.parallels[pptk.name]} aria-hidden={true}
on:click={e=>toggleParallel(e,pptk.name)}>{pptk?.name+' '}</span>
{/each}