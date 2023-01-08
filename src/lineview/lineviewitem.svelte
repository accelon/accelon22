<script>
import {getLVStyle} from '../ts/styling.ts'
import Offtags from './offtags.svelte'
import {Ownerdraws} from '../ownerdraw/ownerdraw.ts';
import InlineText from '../painters/inlinetext.svelte';
import ActiveLineMenu from './activelinemenu.svelte';
import {renderOfftext,getOfftextLineClass} from 'ptk';

export let edge;
export let depth;
export let text;
export let key;
export let sponser='';
export let line;
export let idx; //-1 top line
export let lva; 
export let seq; //seq in lineview
export let dividx;    
export let ownerdraw;
export let ptk;
export let activeword;
export let highlight;
export let active;
let units, activelinemenu,extra;
const getExtraPainter=(ot,extra,parselinetext=false)=>{
    const extraclass=getOfftextLineClass(ptk,ot,extra)
    const out=[]
    for (let i=0;i<extraclass.length;i++) {
        const cls=extraclass[i];
        const col=ptk.columns[cls.backref];
        const foreign=ptk.columns[cls.backref]?.fieldsdef[0].foreign ;
        const keys=foreign? ptk.columns[foreign].keys: col?.keys;
        if (parselinetext && keys) {
            out.push(...keys.findMatches(ot.plain).map(it=>{
            key=keys.find(it[1]);
            return {painter:extra,choff:it[0],text:it[1],   //export to painter backref.svelte
                data:{ptk,key , keys, backref:cls.value, name:foreign, 
                    tagname:'*',togglebutton:true}, id:cls.id
                }
            }));
        } else {
            // ptk/offtext/render renderOfftext check choff 
            out.push({ptk,painter:cls.value,choff:cls.choff,//extra value as painter name
            data:{ptk,tagname:cls.tagname,foreign, backref:cls.backref, id:cls.id,
            attrs:cls.attrs, defattrs:cls.defattrs}
          })
        }
    }
    out.sort((a,b)=>a.choff-b.choff)
    
    return out;
}
const render=(text,line)=>{
    const [units,ot]=renderOfftext(text,{line});
    extra=getExtraPainter(ot,'backref',true)
    .concat(getExtraPainter(ot,'backlink'))
    activelinemenu=getExtraPainter(ot,'activelinemenu');
  
    return units;
}
$: units=render(text,line);
//do not pass units to InlineText, so that it will call renderOfftext again

$: explainword = (active && units.filter(ru=>ru.text==activeword).length>0)?activeword:'' ;
</script>
<div {key} style={"contain: content;"+getLVStyle(depth,edge)} 
 class="lineviewitem" class:highlightline={highlight}  class:activeline={active} >
{#if ownerdraw}
<svelte:component this={Ownerdraws[ownerdraw.painter]} {...ownerdraw.data} {seq} {dividx} />
{:else}
{#if sponser}<span class="sponser" {sponser}></span>{/if}{#if idx>-1}
<br/>{/if}<InlineText {ptk} {line} {seq} {extra} {text} {active} {activeword} before={Offtags} after={Offtags}/>
{#if active}<ActiveLineMenu {explainword} {key} {lva} {ptk} 
{seq} {line} {dividx} {activelinemenu} 
 division={lva.getNode(dividx)}/>{/if}
{/if}
</div>
