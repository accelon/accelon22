<script>
import Node from "../comps/node.svelte";

const buildItems=(keys,values)=>{
    const out=[];
    for (let i=0;i<keys.len();i++) {
        let key=keys.get(i);
        const caption=values[i];
        let depth=key.length;
        while (key.endsWith('0')) {
            key=key.slice(0,key.length-1);
            depth--;
        }
        out.push( {depth,caption});
    }
    return out;
}
export let ptk,address;
const selected=address.split(',');

const getPicker=()=>{
    const pickercol=ptk.attributes.picker;
    if (!pickercol) return '';
    const col=ptk.columns[pickercol];
    return col;    
}
$: column=getPicker();
$: items=buildItems(column.keys,column.fieldvalues[0]);
</script>
<Node {items}/>
