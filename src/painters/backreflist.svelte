<script>
import {intersects, lookupKeyColumn } from 'ptk'    
import RefList from "./reflist.svelte";
//列出所有最有可能一起出現的藥（伙伴藥），按頻次排
//  點伙伴藥 ，合併搜尋
//兩三味藥
//顯示 所有含這些藥的方 數量
//點數字  打開 方的清單 ，方劑名：藥名清單 ，點一下再回原文
//近似方
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