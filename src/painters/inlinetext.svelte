<script>
/* just render the offtext , without */
import {renderOfftext} from 'ptk';
import RenderUnit from './renderunit.svelte';
import {palitrans,tosim} from "../ts/store.ts"
import { get } from 'svelte/store';
export let ptk;
export let hits=[];
export let phraselength=[];
export let text='';
export let units;  //caller supply render units
export let activeword;
export let before,after;
export let extraclass='';
export let seq;
export let line;
$: [runits]=units?[units]:renderOfftext(text,{line,hits,phraselength});
$: _tosim=$tosim;
$: _palitrans=$palitrans;
// $: console.log(runits.filter(ru=>ru.tags.length))
let refreshcount=1;
const onUpdate=()=> refreshcount++;
</script>
{#key refreshcount}
<span>{#each runits as ru}<RenderUnit {ptk}  {before} palitrans={_palitrans} tosim={_tosim}} {after} {ru} active={ru.text==activeword} {seq} {onUpdate} {extraclass} />{/each}</span>
{/key}

