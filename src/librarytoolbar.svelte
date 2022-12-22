<script>
import SelectPitakas from './pitakas.svelte';
import { usePtk,debounce } from 'ptk';
import {activePtkName}  from './ts/store.ts';
export let oninsert;
export let setTofind;
let ptkname=activePtkName();
export let value='';//bUdVDsVs';//反常';
$: items=[];
$: ftsitems=[];

const dosearch=async ()=>{
	const ptk=usePtk(ptkname);
	if (!ptk)return;
	items=ptk.scanPrimaryKeys(value);
	setTimeout(()=>{
		ptk.scanText(value).then(res=>{
			ftsitems=res;
		});
	});
	if (items.length >0 || ftsitems.length>0 ) setTofind(value);
}

const insert=(keyname,mode=0)=>{
	let tofind=value;
	if (mode==0) tofind='$'+value;
	else if (mode==2) tofind=value+'$';
	oninsert({detail:{seq:-1,address:ptkname+':'+ keyname +'='+tofind}});
}
const fulltext=(sectionname)=>{
	let tofind=value;
	oninsert({detail:{seq:-1,address:ptkname+':*'+ sectionname +'='+tofind}});
}
$: dosearch(ptkname,value);
const listchunk=(sectionname)=>{
	let tofind=value;
	oninsert({detail:{seq:-1,address:ptkname+':~'+ sectionname+'='+tofind}});
}
const systeminfo=()=>{
	oninsert({detail:{seq:-1,address:'@systeminfo',singleton:true}});
}
const opensetting=()=>{
	oninsert({detail:{seq:-1,address:'@setting',singleton:true}});
}
</script>
<div class="toolbar">
<span class="clickable" on:click={()=>systeminfo()}></span>
<SelectPitakas bind:ptkname {oninsert}/>
<input bind:value size=8 on:input={debounce(dosearch,500)}/>
{#each items as item,idx}
{#if item.start.length+item.middle.length+item.end.length}
<span class="clickable" title="beginsWith 开头符合"
 on:click={()=>item.start.length&&insert(item.name,0)}>{item.caption}{item.start.length}</span>
<span title="inMiddle 中间符合" class="clickable"
 on:click={()=>item.middle.length&&insert(item.name,1)}>·{item.middle.length}·
</span><span title="endsWith 结尾符合" class="clickable"
 on:click={()=>item.end.length&&insert(item.name,2)}>{item.end.length}{' '}</span>
{/if}
{/each}
{#each ftsitems as item,idx}
<span class='clickable' title='fulltext 全文' 
on:click={()=>listchunk(item.scope)}>{item.caption}</span>{#if item.count}<span class='clickable hitcount' 
on:click={()=>fulltext(item.scope)}>{' '+item.count+'|'}</span>{:else}0|{/if}{' '}
{/each}
<span class="setting clickble" on:click={()=>opensetting()}>🛠️</span>
</div>
<style>
.setting {float:right;padding-right:1em}
</style>
