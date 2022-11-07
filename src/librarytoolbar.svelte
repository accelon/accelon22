<script>
import {onMount} from 'svelte';
import SelectPitakas from './pitakas.svelte';
import { usePtk,debounce } from 'ptk';
import {activePtkName}  from './ts/store.ts';
export let oninsert;
let ptkname=activePtkName();
let value='';//bUdVDsVs';//反常';
$: items=[];
$: ftsitems=[];

const dosearch=async ()=>{
	const ptk=usePtk(ptkname);
	if (!ptk)return;
	items=ptk.scanPrimaryKeys(value);
	setTimeout(()=>{
		ptk.scanSections(value).then(res=>{
			ftsitems=res;
		});
	})
}

const insert=(keyname,mode=0)=>{
	let tofind=value;
	if (mode==0) tofind='^'+value;
	else if (mode==2) tofind=value+'$';
	oninsert({detail:{seq:-1,address:ptkname+':'+ keyname +'='+tofind}});
}
const fulltext=(sectionname)=>{
	let tofind=value;
	oninsert({detail:{seq:-1,address:ptkname+':*'+ sectionname +'='+tofind}});
}
$: dosearch(ptkname,value);
// onMount(()=>value&&dosearch());
</script>
<div class="toolbar">
<SelectPitakas bind:ptkname/>
<input bind:value size=3 on:input={debounce(dosearch,250)}/>
{#each items as item,idx}
{#if item.start.length+item.middle.length+item.end.length}
<span class="clickable" title="beginsWith 开头符合" on:click={()=>item.start.length&&insert(item.name,0)}>{item.caption}{item.start.length}</span><span title="inMiddle 中间符合" class="clickable" on:click={()=>item.middle.length&&insert(item.name,1)}>·{item.middle.length}·</span><span title="endsWith 结尾符合" class="clickable" on:click={()=>item.end.length&&insert(item.name,2)}>{item.end.length}{' '}</span>
{/if}
{/each}
{#each ftsitems as item,idx}
{#if item.count}
<span class='clickable' title='fulltext 全文' on:click={()=>fulltext(item.name)}>{item.caption}{item.count}</span>{' '}
{/if}
{/each}
</div>
