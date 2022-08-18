<script>
/* just render the offtext , without */
import {getRenderUnitClasses,renderOfftext} from 'ptk';
import RenderUnit from './renderunit.svelte';

export let ptk;
export let hits=[];
export let phraselength=[];
export let text='';
export let before,after;
export let extraclass='';
export let seq;
$: runits=renderOfftext(text,{hits,phraselength});

let refreshcount=1;
const onUpdate=()=> refreshcount++;
</script>
{#key refreshcount}
{#each runits as ru}<RenderUnit {ptk} {before} {after} {ru} {seq} {onUpdate} {extraclass} />
{/each}
{/key}

