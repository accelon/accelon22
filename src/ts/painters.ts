import {getOfftextLineClass} from 'ptk';
export const getExtraPainter=(ptk,ot,extra,parselinetext=false)=>{
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