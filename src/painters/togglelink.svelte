<script>
import {getContext} from 'svelte';
import {usePtk,parseAddress} from 'ptk/basket/index.ts';
import {makeAddress,sameAddress} from 'ptk'
const ctx=getContext('LV');
export let classes;
export let tagname;
export let keys;
export let key;
export let name;
export let firstchild; //cannot put in context, need to update when lva is changed
const ptk=usePtk(ctx.ptkname)
const toggle=()=>{
	if (closeit(firstchild)) {
		ctx.remove(firstchild);
	} else {
		const address=makeAddress(ctx.ptkname,tagname+key);
		ctx.insertAddress(address);
	}
}
const closeit=(firstchild)=>{
	const address=makeAddress(ctx.ptkname,tagname+key);
	return sameAddress(address, firstchild);
}

</script>
{#if ptk.validId(tagname,key)}<span on:click={()=>toggle()} class={classes+' clickable '+name+(closeit(firstchild)?' closelink':'')}>{keys&&keys.get(key)}</span>{:else}<span class={classes+' '+name}>{keys&&keys.get(key)}</span>{/if}