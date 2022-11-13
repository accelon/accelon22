<script>/* 隱藏不含關鍵字的句子 */
import {renderOfftext,abridgeRenderUnits,TokenType,MIN_ABRIDGE} from 'ptk';
import RenderUnit from '../painters/renderunit.svelte';
export let ptk;
export let hits=[];
export let phraselength;
export let text='';
export let before,after;
export let extraclass='';

$: [offtext,runits]=renderOfftext(text,{hits,phraselength});
$: abridges=abridgeRenderUnits(runits,30,refreshcount);
let refreshcount=1;
const onUpdate=()=> refreshcount++;
const expand=(idx,direction=0)=>{
	const R=runits;
	const [len,from]=abridges[idx];
	const start=from + (direction==-1?len:0);
	let j=start;
	if (direction==-1) {
		while (j>0&& (R[j].token.type>=TokenType.SEARCHABLE|| start-j<MIN_ABRIDGE )) j--;
		for (let i=j;i<start;i++) R[i].luminate++;
	} else if (direction==1){
		while (j<R.length&& (R[j].token.type>=TokenType.SEARCHABLE||j-start<MIN_ABRIDGE)) j++;
		for (let i=start;i<j;i++) R[i].luminate++;
	} else {
		for (let i=from;i<from+len;i++) R[i].luminate++;
	}
	refreshcount++;
}

</script>
{#key refreshcount}
{#each abridges as ab,idx}
{#if Array.isArray(ab)}
{#if ab[1] && ab[0]>10}<span class="clickable" on:click={()=>expand(idx,1)}>…</span>{/if}<span class="clickable abridged" on:click={()=>expand(idx)}>{ab[0]}</span>{#if !ab[2]}<span class="clickable" on:click={()=>expand(idx,-1)}>…</span>{/if}
{:else}
<RenderUnit {ptk} {before} {after} ru={ab} {onUpdate} {extraclass}/>
{/if}
{/each}
{/key}

