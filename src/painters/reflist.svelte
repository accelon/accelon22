<script>
import {fromObj} from 'ptk'
export let ptk;
export let items=[];
export let name; //factor name (medicine)
export let column; //ref column name (prescription)
export let tofind='';
export let tagname;
export let backref;
export let caption;
const enumPartners=(items,col,foreigncol)=>{
    const partners={}
    for (let i=0;i<items.length;i++) {
        const key=items[i];
        const list=foreigncol.fieldvalues[0][key];
        for (let i=0;i<list.length;i++) {
            if (!partners[list[i]]) partners[list[i]]=0;
            partners[list[i]]++;
        }
        // const col.keys[item];
    }
    let arr=fromObj(partners,true);
    arr.shift();//drop the key
    const avg=arr.reduce((acc , it)=>it[1]+acc , 0) / arr.length;
    arr=arr.filter(it=>it[1]>avg ).map(it=>{
        const n=it[0];
        const caption=col.keys.get(n);
        return {name, n, caption , count: it[1] , tofind, tagname,backref}
    })
    const tofinds=tofind.split(',');
    let drop=tofinds.length-1;
    while (drop) {arr.shift();drop--}
    return arr;
}


import MoreLink from '../comps/morelink.svelte'
import RefListItem from './reflistitem.svelte'
$: col = ptk.columns[column];

$: partners= enumPartners(items, ptk.columns[name], col);
</script>
<span class="tofind">{tofind}</span>
{#if partners.length}
<MoreLink {ptk} items={partners} itemRenderer={RefListItem}/>
{/if}


