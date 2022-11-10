<script>
/* just render the offtext , without */
import {renderOfftext} from 'ptk';
import RenderUnit from './renderunit.svelte';

export let ptk;
export let hits=[];
export let phraselength=[];
export let text='';
export let before,after;
export let extraclass='';
export let seq;
export let active;
$: runits=renderOfftext(text,{hits,phraselength});

let refreshcount=1;
const onUpdate=()=> refreshcount++;
</script>
{#key refreshcount}
<span class:activeline={active} >{#each runits as ru}<RenderUnit {ptk} {before} {after} {ru} {seq} {onUpdate} {extraclass} />{/each}</span>
{/key}

