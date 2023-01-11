<script>
import StateButtons from '../comps/statebuttons.svelte';
import StateButton from '../comps/statebutton.svelte';
export let ptk,seq;
import {GUIDEACTIONPREFIX} from 'ptk'
import {getContext} from 'svelte';
import MoreLink from '../comps/morelink.svelte'
import GroupStatLink from '../comps/groupstatlink.svelte'


const LV=getContext('LV');
const filters=ptk.template.getMultiStateFilters();

$: groups={}
$: items=[];
let groupby=0,groupitems=[],mastertag, choices={};
const groupstates=ptk.template.groupStates('statebutton');
const update=()=>{
    const col=ptk.columns[ptk.template.filterColumn];
    const obj=ptk.template.runFilter(ptk,col,{choices,groupby});
    items=obj.items;
    groups=obj.groups;
    mastertag=obj.mastertag;
    groupitems=groups.map((it,idx)=>{
        return {idx,caption:it[0],count:it[1],groupfilter:it[2]}
    })
}
for (let i=0;i<filters.length;i++) {
    choices[filters[i].name]=[];
}
let refresh=1;
const choicecount=()=>{
    let count=0;
    for (let field in choices) {
        count+=choices[field].length;
    }
    return count;
}
const reset=name=>{
    choices[name]=[]
    choices=choices;
    refresh++;
}
$: update(choices,groupby);
const list=(idx=-1)=>{
    let gitem;
    if (idx>-1) {
        gitem=groupitems[idx];
    }
    const action=ptk.template.stringifyChoice(choices,groupby,gitem?.groupfilter);
    LV.insertAddress(GUIDEACTIONPREFIX+action,seq);
}
</script>
{#each filters as filter}
<span class="guidegroup closelink clickable" 
on:click={()=>reset(filter.name)}>{filter.caption}</span>
<StateButtons unselectable={true} {refresh} items={filter.states} bind:choices={choices[filter.name]}/>
{#if filter.newline}<br/>{/if}
{/each}
{#key items}
<br/>
{#if items.length}
<span on:click={()=>list(-1)} class="clickable hitcount">{items.length}{mastertag.attrs.caption}</span>
<StateButton bind:selectedIndex={groupby} states={groupstates}></StateButton>
<MoreLink {ptk} items={groupitems} onclick={list} itemRenderer={GroupStatLink}/>
{:else if choicecount()}
找不到
{/if}

{/key}