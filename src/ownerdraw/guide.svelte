<script>
import {getContext} from 'svelte';
import Node from "../comps/node.svelte";
import InlineText from '../painters/inlinetext.svelte';
export let ptk,action;
const LV=getContext('LV');
const Selected=action.split(',');
export let dividx;
export let actionprefix='';
export let items=[];
export let seq;
const buildItems=(keys,values)=>{
    if (!keys || !values) return [];
    const out=[];
    for (let i=0;i<keys.len();i++) {
        let key=keys.get(i);
        const caption=values[i];
        const selected=~Selected.indexOf(key);
        let depth=key.length;
        while (key.endsWith('0')) {
            key=key.slice(0,key.length-1);
            depth--;
        }
        out.push( {depth,caption,selected,key});
    }
    return out;
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

	LV.insertAddress(makeChunkAddress(ck,lineoffset),seq);
}

$: column=getPicker();
$: pickeritems=buildItems(column?.keys,column?.fieldvalues[0]);
$: displayitems=items.slice(0,5);
</script>
<Node items={pickeritems} {update}/>
{items.length}
{#each displayitems as item,idx}
<div><span class="clickable excerptheading" on:click={()=>onclick(idx)}>{item.chunkname}</span>
<InlineText {ptk} line={items.line} {seq} text={item.text}/>
</div>
{/each}
