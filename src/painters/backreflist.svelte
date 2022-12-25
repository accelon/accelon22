<script>
import {intersects, lookupKeyColumn } from 'ptk'    
import RefList from "./reflist.svelte";
export let tofind='';  // comma separated
export let seq,ptk,name, backref,tagname,showitemlength;

const backrefcol=ptk.columns[backref];
const foreign=backrefcol.fieldsdef[1].foreign;

const getItems=(tofind)=>{
    const tofinds=tofind.split(',');
    const out=intersects(tofinds.map(it=>lookupKeyColumn(ptk,backref,it,name)));
    return out;
}
$: items= getItems(tofind);

</script>
{#if showitemlength}{items.length}{/if}
<RefList {seq} {ptk} {name} {backref} {tagname} {items} {foreign} {tofind}/>