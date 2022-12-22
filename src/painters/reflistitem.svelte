<script>
import {Painters} from '../painters/painters.ts'

export let ptk;
export let caption;
export let count;
export let tofind;
export let tagname;
export let name;
export let backref;

$: opened=false;
$: tofind2=tofind;
const listref=()=>{

}
const addCriteria=(caption)=>{
    tofind2=tofind+','+caption;
    opened=!opened;
}
</script>
<span class="clickable refhitcount" on:click={()=>listref()}>{count}</span><span class="clickable" on:click={()=>addCriteria(caption)}>{caption+" "}</span>{#if opened}(<svelte:component {ptk} {name} {tagname} {backref} tofind={tofind2} this={Painters.backreflist}/>){/if}