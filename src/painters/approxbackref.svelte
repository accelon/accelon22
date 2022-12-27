<script>
import { calApprox} from 'ptk';
export let ptk;
export let seq;
export let id;
export let foreign;//medicine
export let tagname;//
export let backref
const getApprox=()=>{
    const col=ptk.columns[tagname];
    const at=col.findKey(id);
    const members=col.fieldvalues[0][at];

    foreigncol=ptk.columns[foreign];
    // console.log(    out.map(it=>  foreigncol.keys.get(it)));
    const approx=calApprox(col, members );
    
    const out=approx.map( ([at,similarity])=>{
        const _id = col.keys?col.keys.get(at):at+1;
        return (id==_id) ? null: {  id:_id,similarity };
    }).filter(it=>!!it).sort((a,b)=>b.similarity- a.similarity);
    return out;
}
$: items = getApprox();
</script>
{#each items as item}
<div>{item.id} {item.similarity} </div>
{/each}
id {id}
seq {seq} backref {backref} foreign {foreign} tagname {tagname}