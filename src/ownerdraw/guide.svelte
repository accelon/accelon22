<script>
import {getContext} from 'svelte';
import Node from "../comps/node.svelte";
import InlineText from '../painters/inlinetext.svelte';
export let ptk,action;
import {fromObj,makeChunkAddress} from 'ptk';
const LV=getContext('LV');
const Selected=action.split(',');
export let dividx;
export let actionprefix='';
export let items=[];
export let seq;
$: activegroup='' ;
$: activemember='';
$: selectedmembers=[];
$: note=''
const getGroups=(values)=>{
    if (!values) return [];
    const groups={};
    for(let i=0;i<values.length;i++) {
        if (!groups[values[i]]) groups[values[i]]=0;
        groups[values[i]]++
    }
    return fromObj(groups,([a,b])=>a);
}
const update=()=>{
    const newselected=pickeritems.filter(it=>it.selected).map(it=>it.key);
    LV.changeAction(dividx,actionprefix+newselected.join(','));
}
const getPicker=()=>{
    const pickercolname=ptk.attributes.picker;
    if (!pickercolname) return '';
    const pickercol=ptk.columns[pickercolname];
    return pickercol;    
}
const onclick=idx=>{
    const cktag=ptk.defines.ck;
    const chunk=displayitems[idx].chunk;
    const id=cktag.fields.id.values[chunk];
    const chunkline=cktag.linepos[chunk];
    const lineoffset=displayitems[idx].line - chunkline ;
    const ck=ptk.getNearestChunk( chunkline );
	LV.insertAddress(makeChunkAddress(ck,id,lineoffset),seq);
}
$: column=getPicker();
$: groupfield=column?.fieldvalues[1];
$: captionfield=column?.fieldvalues[2];
$: aliasfield=column?.fieldvalues[3];

$: groupmembers=[]
const listgroup=group=>{
    groupmembers=[];
    note='';
    activemember=-1;
    if (activegroup==group) {
        activegroup='';
        
        return;
    }
    activegroup=group;

    
    for (let i=0;i<groupfield.length;i++) {
        if (groupfield[i]==group) {
            groupmembers.push({
                idx:i,
                key:column.getKey(i),
                caption:captionfield[i],
                aliasfield:captionfield[i],
                notefield:captionfield[i],
            })
        }
    }
}
const removemember=(idx)=>{
    const at=selectedmembers.indexOf(idx);
    if (~at) {
        selectedmembers.splice(at,1);
        selectedmembers=selectedmembers;
    }
}
const addmember=(idx)=>{
    
    if (selectedmembers.indexOf(idx)==-1) {
        selectedmembers.push(idx);
        selectedmembers=selectedmembers;
    }
}

const toggleselect=(idx)=>{
    const notefield=column?.fieldvalues[4];
    if (activemember==idx) {
        activemember=-1;
        note=''
        removemember(idx);
        return;
    }
    note=notefield[idx];
    activemember=idx;
    addmember(idx);
}
const clearmember=()=>{
    selectedmembers=[];
}
$: displayitems=items.slice(0,5);
$: groups=getGroups(column?.fieldvalues[1]);
</script>

{#each groups as group}
<span class:highlight={group==activegroup} class="pickerbutton clickable" on:click={()=>listgroup(group)}>{group}</span>
{/each}
{#if groupmembers.length}<div class="divider"></div>{/if}
{#each groupmembers as member}
<span class:highlight={member.idx==activemember}  class="pickerbutton clickable" on:click={()=>toggleselect(member.idx)}>{member.caption}</span>
{#if member.idx==activemember}<span class="pickernote">{note}</span>{/if}
{/each}
{#if selectedmembers.length}<div class="divider"></div>
<span class="clickable" on:click={()=>clearmember()}>╳</span>
{#each selectedmembers as member}
<span class="clickable pickercriteria" on:click={()=>removemember(member)}>{captionfield[member]}</span>
{/each}
{/if}
{#each displayitems as item,idx}
<div><span class="clickable excerptheading" on:click={()=>onclick(idx)}>{item.chunkname}</span>
<InlineText {ptk} line={items.line} {seq} text={item.text}/>
</div>
{/each}
