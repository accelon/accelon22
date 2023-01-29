<script>
import {getContext} from 'svelte';
import {textClasses,_} from '../ts/textout.ts';
import ChunkMenu from './chunkmenu.svelte';
import Button from '../comps/button.svelte'
export let item; // seq 第幾行 , idx 第幾個 division
export let ptk ,lva;
const LV=getContext('LV');
$: caption='';
$: if (item.idx!==-1) caption=ptk?.getHeading(item.line+1).caption; //readable
$: division=lva.getNode(item.idx);
let showchunkmenu=false;
const chunkmenu=()=>{
    showchunkmenu=!showchunkmenu;
}
const onHide=()=>{
    showchunkmenu=false;
}
</script>
<span class='lineviewmenu'>
{#if caption && !division?.singleton}<!-- navigating a reading segment and not singleton division-->
{#if LV.canless(division)}<Button onclick={()=>LV.onless(division)}>⧿</Button>{/if}
{#if LV.canmore(division)}<Button onclick={()=>LV.onmore(division)}>⧾</Button>{/if}
{#if LV.canprev(division)}<Button onclick={()=>LV.onprev(division)}>{division?.from+1}/</Button>{/if}
{#if LV.cannext(division)}<Button onclick={()=>LV.onnext(division)}>{division.last-division.first}</Button>{/if}

<Button className={'clickable lineviewheading'+textClasses(ptk)} 
 onclick={()=>chunkmenu(item.idx)}>{_(caption,ptk?.lang)}</Button>
{/if}
<Button onclick={()=>LV.onremove(division)}>⨯</Button>
</span>
{#if showchunkmenu}
<ChunkMenu {...item} {ptk} {onHide}/>
{/if}

