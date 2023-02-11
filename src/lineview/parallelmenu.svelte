<script>
import {getContext} from 'svelte';
import {unique} from 'ptk'
export let ptk;
export let update;
export let division;
const parallels=division?.getParallelWithDiff();
const LV=getContext('LV');
const parallelsPtk = unique(parallels.map(it=>it[0]));
const  toggleParallel= (e,ptkname)=>{
    setTimeout(async function(){
        const v= (ptk.parallels[ptkname])?0:(new Date()).valueOf();
        ptk.parallels[ptkname]=v;           // parallel setting in individual ptk
        LV.setParallel(ptk.name,ptkname,v); // update the localstorage 
        update();
    });
    e.stopPropagation();
}
</script>
{#each parallelsPtk as pptk }
<span class='clickable' class:closelink={ptk.parallels[pptk.name]} aria-hidden={true}
on:click={e=>toggleParallel(e,pptk.name)}>{pptk.humanName()+' '}</span>
{/each}