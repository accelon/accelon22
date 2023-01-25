<script>
import {getContext} from 'svelte';
import InlineText from '../painters/inlinetext.svelte';
export let ptk,action;
import {fromObj,makeChunkAddress} from 'ptk';
import Button from '../comps/button.svelte';
const LV=getContext('LV');
export let dividx;
export let actionprefix='';
export let items=[];
export let seq;
const pagesize=5;
$: activegroup='' ;
$: activemember='';
$: selectedmembers=action.split(',').filter(it=>!!it);

$: note=''
let from=0;
$: last=items.length;
$: groupmembers=[]
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
    LV.changeAction(actionprefix+selectedmembers.join(','),dividx);
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
                notefield:captionfield[i],
            })
        }
    }
}
const removemember=(id)=>{
    const at=selectedmembers.indexOf(id);
    if (~at) {
        selectedmembers.splice(at,1);
        selectedmembers=selectedmembers;
        update();
    }
}
const addmember=(id)=>{
    if (selectedmembers.indexOf(id)==-1) {
        selectedmembers.push(id);
        selectedmembers=selectedmembers;
        update();
    }
}

const toggleselect=(idx)=>{
    const id=column.getKey(idx);

    const notefield=column?.fieldvalues[4];
    if (activemember==id) {
        activemember=-1;
        note=''
        removemember(id);
        return;
    }
    note=notefield[idx];
    activemember=id;
    addmember(id);
}
const clearmember=()=>{
    selectedmembers=[];
    update();
}
const next=()=>{
	if (from+pagesize>=last) return; //is last page
	from+=pagesize;
	if (from>last) from=last-1;
}
const prev=()=>{
	from-=pagesize;
	if (from<0) from=0;
}
$: column=getPicker();
$: groupfield=column?.fieldvalues[1];
$: captionfield=column?.fieldvalues[2];

$: displayitems=items.slice(from,from+5);
$: groups=getGroups(column?.fieldvalues[1]);

const memberCaption=key=>{
    const at=column.findKey(key);
    const group=groupfield[at];
    let caption=captionfield[at];
    if (!~caption.indexOf(group)) caption=group+'.'+caption;
    return caption;
}

</script>

{#each groups as group}
<span class:highlight={group==activegroup} aria-hidden="true" class="pickerbutton clickable" on:click={()=>listgroup(group)}>{group}</span>
{/each}
{#if groupmembers.length}<div class="divider"></div>{/if}
{#each groupmembers as member}
<span class:highlight={member.key==activemember} aria-hidden="true" class="pickerbutton clickable" on:click={()=>toggleselect(member.idx)}>{member.caption}</span>
{#if member.key==activemember}<span class="pickernote">{note}</span>{/if}
{/each}
{#if selectedmembers.length}<div class="divider"></div>
<Button onclick={clearmember}>╳</Button>
{#each selectedmembers as member}
<span class="clickable pickercriteria" aria-hidden="true"  on:click={()=>removemember(member)}>{memberCaption(member)}</span>
{/each}
{/if}
{#if items.length}
<Button onclick={prev}>{from+1}/</Button><Button onclick={next}>{last}</Button>
{/if}
{#each displayitems as item,idx}
<div><Button className="excerptheading"
    onclick={()=>onclick(idx)}>{item.chunkname}</Button>
<InlineText {ptk} line={items.line} {seq} text={item.text}/>
</div>
{/each}
