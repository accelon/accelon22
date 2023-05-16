<script>
import SelectPitakas from './pitakas.svelte';
import { usePtk,debounce } from 'ptk';
import {activePtkName,lvaddr}  from './ts/store.ts';
import Button from './comps/button.svelte'
import {_} from './ts/textout.ts'
export let oninsert;
export let setTofind;

let ptkname=activePtkName();
export let value='';//bUdVDsVs';//反常';
$: items=[];
$: ftsitems=[];

const dosearch=async ()=>{
	const ptk=usePtk(ptkname);
	if (!ptk)return;
	items=ptk.scanColumnFields(value);
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
const scanqrcode=()=>{
	oninsert({detail:{seq:-1,address:'@qrcode',singleton:true}});
}
const insertContainList=(columnname,field)=>{
	const tofind=value;
	oninsert({detail:{seq:-1,address:ptkname+':'+ columnname+'.'+field +'='+tofind}});
}
const closeall=()=>{
	lvaddr.set('')
}
</script>
<div class="toolbar">

<SelectPitakas bind:ptkname {oninsert}/>
<input bind:value size=5 on:input={debounce(dosearch,500)}/>
{#each items as item,idx}
{#if item.contain?.length}
<Button onclick={()=>insertContainList(item.name,item.field)}>{item.caption} {item.contain.length}</Button>
{/if}
{#if item.start?.length+item.middle?.length+item.end?.length}
<Button title="beginsWith 开头符合"
 onclick={()=>item.start.length&&insert(item.name,0)}>{item.caption}{item.start.length}</Button>
<Button title="inMiddle 中间符合" 
 onclick={()=>item.middle.length&&insert(item.name,1)}>·{item.middle.length}
</Button><Button title="endsWith 结尾符合" 
 onclick={()=>item.end.length&&insert(item.name,2)}>{'·'}{item.end.length}{' '}</Button>
{/if}
{/each}
{#each ftsitems as item,idx}
{#if item.count}
<span class="ak">
<Button title='fulltext 全文' 
onclick={()=>listchunk(item.scope)}>{_(item.caption)}</Button>{#if item.count}<Button className='clickable hitcount' 
onclick={()=>fulltext(item.scope)}>{' '+item.count+' '}</Button>{:else}0{/if}</span>{' '}
{/if}
{/each}
<Button className='floatright' onclick={closeall}>❌</Button>
<Button className='floatright' onclick={opensetting}>🛠️</Button>
<!-- {#if typeof Html5QrcodeScanner === 'function'} -->
<!-- <Button className='setting' onclick={scanqrcode}>{@html qrcode}{'　'}</Button> -->
<!-- {/if} -->
</div>
<style>
input {font-size:1em}
</style>
