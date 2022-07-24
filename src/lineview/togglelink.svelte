<script>
import {getContext} from 'svelte';
import {usePtk,parseAddress} from 'ptk/basket/index.ts';
const ctx=getContext('LV');
export let classes;
export let tagname;
export let keys;
export let key;
export let name;
export let nextlva; //cannot put in context, need to update when lva is changed

const ptk=usePtk(ctx.ptkname)
const toggle=()=>{
	const addr=tagname+key
	if (closeit(nextlva)) {
		ctx.remove(ctx.nextlvaseq);
	} else {
		ctx.insertAddress(ctx.ptkname+':'+addr);
	}
}
const closeit=(nextlva)=>{
	//const {ele,id,idleft,right}=parseAddress(nextlva||'')
	//! left 表示下面是被剖開的後半部，只作用在上半部前一行
	//const r=(eleid).endsWith('@'+tagname+key) && !left; 
	//return r;
}

</script>
{#if ptk.validId(tagname,key)}<span on:click={()=>toggle()} class={classes+' clickable '+name+(closeit(nextlva)?' closelink':'')}>{keys.get(key)}</span>{:else}<span class={classes+' '+name}>{keys.get(key)}</span>{/if}