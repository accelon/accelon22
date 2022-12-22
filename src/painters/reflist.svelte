<script>
import {countMembers} from 'ptk'
export let ptk;
export let items=[];
export let name; //factor name (medicine)
export let foreign; //foreign column name (formula)
export let tofind='';
export let tagname;
export let backref;
export let seq;

const statMembers=(items,foreigncol)=>{
    const col=ptk.columns[name];
    const arr=countMembers(items,foreigncol,tofind).map(it=>{
        const n=it[0];
        const caption=col.keys.get(n);
        return {name, seq, n, foreign , caption ,count: it[1] , tofind, tagname,backref}
    })
    return arr;
}

import MoreLink from '../comps/morelink.svelte'
import RefListItem from './reflistitem.svelte'
$: items2= statMembers(items, ptk.columns[foreign]);
</script>
<span class="tofind">{tofind}</span>
{#if items2.length}
<MoreLink {ptk} items={items2} itemRenderer={RefListItem}/>
{/if}


