<script>
import {getContext} from 'svelte';
import Node from "../comps/node.svelte";
export let ptk,action;
const LV=getContext('LV');
const Selected=action.split(',');
export let dividx;
export let actionprefix='';
const buildItems=(keys,values)=>{
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
    const newselected=items.filter(it=>it.selected).map(it=>it.key).join(',')
    LV.changeAction(dividx,actionprefix+newselected);
}
const getPicker=()=>{
    const pickercol=ptk.attributes.picker;
    if (!pickercol) return '';
    const col=ptk.columns[pickercol];
    return col;    
}
$: column=getPicker();
$: items=buildItems(column.keys,column.fieldvalues[0]);
</script>
<Node {items} {update}/>
