<script>/* 隱藏不含關鍵字的句子 */
import {renderOfftext,abridgeRenderUnits,TokenType,MIN_ABRIDGE} from 'ptk';
import RenderUnit from './renderunit.svelte';
export let ptk;
export let hits=[];
export let phraselength=[];
export let text='';
export let before,after;
export let extraclass='';

$: runits=renderOfftext(text,{hits,phraselength});
$: abridges=abridgeRenderUnits(runits,refreshcount);
let refreshcount=1;
const onUpdate=()=> refershcount++;
const expand=(idx,left=false)=>{
	const R=runits;
	const [len,from]=abridges[idx];
	const start=from + (left?len:0);
	let j=start;
	if (left) {
		while (j>0&& (R[j].token.type>=TokenType.SEARCHABLE|| start-j<MIN_ABRIDGE )) j--;
		for (let i=j;i<start;i++) R[i].luminate++;
		
	} else {
		while (j<R.length&& (R[j].token.type>=TokenType.SEARCHABLE||j-start<MIN_ABRIDGE)) j++;
		for (let i=start;i<j;i++) R[i].luminate++;
	}
	refreshcount++;
}

</script>
{#key refreshcount}
{#each abridges as ab,idx}
{#if Array.isArray(ab)}
{#if ab[1]}<span class="clickable" on:click={()=>expand(idx)}>…</span>{/if}<span class="abridged">{ab[0]}</span>{#if !ab[2]}<span class="clickable" on:click={()=>expand(idx,true)}>…</span>{/if}
{:else}
<RenderUnit {ptk} {before} {after} ru={ab} {onUpdate} {extraclass}/>
{/if}
{/each}
{/key}

