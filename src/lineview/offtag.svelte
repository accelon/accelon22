<script>
import {onMount} from 'svelte'
import {usePtk} from 'ptk'
import keys from './keys.svelte';

const Taggers={keys};
let taggers=[];
export let tag;
export let close;
export let ptkname;
export let firstchild;

const getTaggers=()=>{
	const defines=usePtk(ptkname).typedefOf(tag.name);
	if (!defines) return;
	taggers.length=0;
	for (let name in tag.attrs) {
		if ( defines[name] ){
			const {keys,type,foreign}=defines[name];
			if(Taggers[type]) {
				taggers.push([Taggers[type], {name,  tagname:tag.name, masterid:tag.attrs.id,
					keys, type,	ptkname,foreign, firstchild, value:tag.attrs[name]}]);

			}
		}
	}

	taggers=taggers;
}
$: getTaggers(firstchild);
</script>
{#if close}
{#each taggers as tagger}
<svelte:component this={tagger[0]} classes={ptkname+" "+tag.name} {...tagger[1]}/>
{/each}
{/if}