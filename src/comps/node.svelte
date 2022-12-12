<script>
export let items;
console.log(items)
const hideAll=()=>{
    for (let i=0;i<items.length;i++) {
        if (items[i].depth>1) items[i].show=false;
    }
}
const selectable=idx=>{
    if (idx==items.length-1) return true;
    return items[idx].depth>=items[idx+1].depth;
}
const unselectSibling=idx=>{
    const d=items[idx].depth;
    let from=idx-1, to=idx+1;
    while (from>0 && items[from].depth>=d ) {
        if(items[from].selected) items[from].selected=false;
        from--;
    }

    while (to<items.length && items[to].depth>=d ) {
        if (items[to].selected) items[to].selected=false;
        to++;
    }

}
let refreshcount=0;
const toggle=idx=>{
    const item=items[idx];
    if (selectable(idx)) {
        unselectSibling(idx)
        item.selected=!item.selected;
        
    } else {
        hideAll();
        item.show=!item.show;
        const d=item.depth;
        if (item.show) {
            for (let i=idx+1;i<items.length;i++) {
                if (items[i].depth==d+1 || items[i].selected) {
                    items[i].show=true;
                }
                if (items[i].depth<=d) break;
            }
        }
    }
    refreshcount++;
}
</script>
{#key refreshcount}
{#each items as item,idx}
{#if item.depth==1||item.show || item.selected}<span on:click={()=>toggle(idx)}
 style={'border-bottom:'+(item.depth)+'px solid white'}
 class={"pickernode "+(item.selected?'selectedpickernode':'')}>{item.caption}</span>{' '}{/if}
{/each}
{/key}