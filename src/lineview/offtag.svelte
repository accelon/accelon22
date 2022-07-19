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
	for (let attr in tag.attrs) {
		if ( defines[attr] ){
			const attrtype=defines[attr].type;
			if(Taggers[attrtype]) {
				taggers.push({component:Taggers[attrtype], attr, value:tag.attrs[attr]});
			}
		}
	}
	taggers=taggers;
}
onMount(()=>getTaggers());

</script>
{#if close}
{#each taggers as tagger}
<svelte:component this={tagger.component} name={tagger.attr} value={tagger.value}/>
{/each}
{/if}