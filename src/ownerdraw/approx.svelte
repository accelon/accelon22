<script>/* 顯示有關鍵字的行*/
import {getContext} from 'svelte';
import Paging from '../comps/paging.svelte'
import Inlinetext from '../painters/inlinetext.svelte';
import ExcerptHeading from './excerptheading.svelte';
// export let caption;
// export let action;
export let name;
export let lines;
export let seq;
export let dividx;
export let ptk;
// export let last;
export let from;
export let similarity;
let items=[];
$: name;
const LV=getContext('LV');
let pfrom=from;
async function load(){
    await ptk.loadLines(lines);
    items=lines.map((line,idx)=>{
        const ck=ptk.getHeading(line);
        return {ck, line,text:ptk.getLine(line), similarity:similarity[idx] };
    });

}
$: displayitems=items.slice(from,from+5) ;

const setFrom=()=>{
    if (pfrom==from) return;
    LV.setFrom(dividx,from);
    pfrom=from;
}
$: setFrom(from);
$: load(lines);
</script>
{#if !displayitems.length}😢 找不到 Not Found{/if}
<div>≈<Paging bind:from {items}/></div>
{#each displayitems as item}
<div><ExcerptHeading {ptk} {seq} {...item.ck}/>
{Math.floor(item.similarity*100)+'%'} <Inlinetext text={item.text} {ptk} {seq}/></div>
{/each}
