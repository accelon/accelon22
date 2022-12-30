<script>/* 顯示有關鍵字的行*/
import {getContext} from 'svelte';
import {makeElementId} from 'ptk'
import Inlinetext from '../painters/inlinetext.svelte';
import ExcerptHeading from './excerptheading.svelte';
export let caption;
export let action;
export let name;
export let lines;
export let seq;
export let dividx;
export let ptk;
export let last;
export let from;
export let similarity;
$: displayitems=[] ;
$: name;
const LV=getContext('LV');
let pfrom=from;
async function load(){
    await ptk.loadLines(lines);
    displayitems=lines.map((line,idx)=>{
        const ck=ptk.getHeading(line);
        return {ck, line,text:ptk.getLine(line), similarity:similarity[idx] };
    });
}
const setFrom=()=>{
    if (pfrom==from) return;
    LV.setFrom(dividx,from);
    pfrom=from;
}
const openChunk=(bkid,tagname,id)=>{
    const address=makeElementId('bk',bkid)+'.'+tagname+(parseInt(id)?id:'#'+id);
    LV.insertAddress(address,seq);
}
$: setFrom(from);
$: load(lines);
</script>
{#if !displayitems.length}😢 找不到 Not Found{/if}
{#each displayitems as item}
<div><ExcerptHeading {ptk} {seq} {...item.ck}/>
{Math.floor(item.similarity*100)+'%'} <Inlinetext text={item.text} {ptk} {seq}/></div>
{/each}
