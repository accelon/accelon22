<script>
/* just render the offtext , without */
import {renderOfftext} from 'ptk';
import RenderUnit from './renderunit.svelte';

export let ptk;
export let hits=[];
export let phraselength=[];
export let text='';
export let units;  //caller supply render units
export let active; //active line
export let activeword;
export let before,after;
export let extraclass='';
export let seq;
export let line;

$: [offtext,runits]=units?['',units]:renderOfftext(text,{line,hits,phraselength});


// $: console.log(runits.filter(ru=>ru.tags.length))
let refreshcount=1;
const onUpdate=()=> refreshcount++;
</script>
{#key refreshcount}
<span>{#each runits as ru}<RenderUnit {ptk} {before} {after} {ru} active={ru.text==activeword} {seq} {onUpdate} {extraclass} />{/each}</span>
{/key}

