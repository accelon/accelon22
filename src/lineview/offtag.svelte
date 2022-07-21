<script>
import {onMount} from 'svelte'
import {usePtk} from 'ptk'
import keys from './keys.svelte';

const Taggers={keys};
let taggers=[];
export let tag;
export let close;
export let ptkname;

const getTaggers=()=>{
	const defines=usePtk(ptkname).typedefOf(tag.name);
	for (let name in tag.attrs) {
		if ( defines[name] ){
			const {keys,type,foreign}=defines[name];
			if(Taggers[type]) {
				taggers.push([Taggers[type], {name,  tagname:tag.name,
					keys, type,	ptkname,foreign, value:tag.attrs[name]}]);
			}
		}
	}
	taggers=taggers;
}
onMount(()=>getTaggers());

</script>
{#if close}
{#each taggers as tagger}
<svelte:component this={tagger[0]} classes={ptkname+" "+tag.name} {...tagger[1]}/>
{/each}
{/if}