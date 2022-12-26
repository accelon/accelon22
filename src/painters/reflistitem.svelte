<script>
import {getContext,onMount} from 'svelte';
import {Painters} from '../painters/painters.ts'
export let ptk;
export let caption;
export let count;
export let tofind;
export let foreign;
export let tagname;
export let name;
export let backref;
export let seq;

const LV=getContext('LV');
$: opened=false;
$: tofind2=tofind+','+caption;
const listref=()=>{
    // console.log(name,backref,foreign,count,tofind2);
    LV.insertAddress(ptk.name+':*'+foreign+'@'+name+'='+tofind2,seq);
}
const addCriteria=()=>{
    opened=!opened;
}
</script>
<span class="clickable refhitcount"
 on:click={()=>listref()}>{count}</span><span
  class="clickable" 
  on:click={()=>addCriteria()}>{caption+" "}</span>{#if opened}(<svelte:component
   {ptk} {name} {tagname} {backref} {seq}
   tofind={tofind2} this={Painters.backreflist}/>){/if}