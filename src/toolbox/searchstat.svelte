<script>
import {sources} from '../ts/editor.ts'
import {fromObj,cjkPhrases} from 'ptk';
export let tofind='';
let items=[], processing=0;
const dosearch=(tofinds)=>{
    items=[];
    for (let i=0;i<tofinds.length;i++){
        const reg=new RegExp(tofinds[i],'g');
        const word= cjkPhrases(tofinds[i]).join('');
        const res={};
        for (let j=0;j<$sources.length;j++) {
            processing=j+1;

            $sources[j].text.replace(reg,(m)=>{
                const phrases=cjkPhrases(m);
                for (let k=0;k<phrases.length;k++) {
                    const ph=phrases[k];
                    if (ph.indexOf(word)==-1) continue;
                    if (!res[ph])res[ph]=0;
                    res[ph]++;
                }
            })
        }
        const arr=fromObj(res,true);
        items.push([tofinds[i],arr])
    }
    processing=0;
}
$: dosearch(tofind.trim().split(/[\n\$,]/).filter(it=>!!it) );
const copy=async (withnum=false)=>{
    let text='';
    if (withnum) {
        text=items.map(it=>it[1].map(it=>it[0]+'\t'+it[1]).join('\t')).join('\n')
    } else {
        text=items.map(it=>it[1].map(it=>it[0]).join(',')).join('\n')
    }
    await navigator.clipboard.writeText(text);
}

</script>
<div>
<button on:click={()=>copy(true)}>複製(含數字)</button>
<button on:click={()=>copy()}>複製</button>
{#key processing}
{#if processing}{processing}{/if}
{/key}
{#each items as item}
<div>{item[1]}</div>
{/each}
</div>