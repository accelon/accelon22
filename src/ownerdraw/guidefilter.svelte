<script>
import StateButtons from '../comps/statebuttons.svelte';
export let ptk,seq;
import {GUIDEACTIONPREFIX} from 'ptk'
import {getContext} from 'svelte';
import MoreLink from '../comps/morelink.svelte'

const LV=getContext('LV');
const filters=ptk.template.getMultiStateFilters();

let choices={};
let items=[];
let groups={};
const update=()=>{
    const col=ptk.columns[ptk.template.filterColumn];
    const obj=ptk.template.runFilter(ptk,col,choices);
    items=obj.items;
    groups=obj.groups;
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
$: update(choices);
const listChunk=()=>{
    const choice=ptk.template.stringifyChoice(choices);
    LV.insertAddress(GUIDEACTIONPREFIX+choice,seq);
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
<span on:click={()=>listChunk()} class="clickable hitcount">{items.length} </span>
<MoreLink {ptk} items={groups}/>
{:else if choicecount()}
找不到
{/if}

{/key}