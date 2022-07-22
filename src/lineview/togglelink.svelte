<script>
import {getContext} from 'svelte';
import {usePtk} from 'ptk/basket/index.ts';
const ctx=getContext('LV');
export let classes;
export let tagname;
export let keys;
export let key;
export let name;
export let nextlva; //cannot put in context, need to update when lva is changed
export let idx;

const ptk=usePtk(ctx.ptkname)
const toggle=()=>{
	const addr='@'+tagname+key
	if (closeit(key)) {
		ctx.remove(ctx.nextlvaseq);
	} else {
		ctx.insertAddress(ctx.ptkname+' '+addr);
	}
}
const closeit=()=>{
	const r=(nextlva||'').endsWith('@'+tagname+key) ;
	return r;
}
</script>
{idx}
{#key nextlva}
{#if ptk.validId(tagname,key)}<span on:click={()=>toggle()} class={classes+' clickable '+name+(closeit()?' closelink':'')}>{keys.get(key)}</span>{:else}<span class={classes+' '+name}>{keys.get(key)}</span>{/if}
{/key}