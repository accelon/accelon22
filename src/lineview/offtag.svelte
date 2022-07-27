<script>
import {onMount} from 'svelte'
import {usePtk} from 'ptk'
import keys from './keys.svelte';
import note from './note.svelte';
const Taggers={keys,note};
let taggers=[];
export let offtext;
export let ntag;
export let close;
export let ptkname;
export let firstchild;

const getTaggers=()=>{
	const tag=offtext.getTag(ntag);

	const defines=usePtk(ptkname).typedefOf(tag.name);
	if (!defines) return;
	taggers.length=0;


	if (tag.active) {
		const tagger=Taggers[defines.type?.type];
		if (tagger) {
			const {keys,type,foreign} = defines.type;
			taggers.push([tagger,{name,  tagname:tag.name, masterid:tag.attrs.id,
						keys, ptkname,foreign, firstchild}]);
		}
	}

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
<svelte:component this={tagger[0]} classes={ptkname+" "+tagger.tagname} {...tagger[1]}/>
{/each}
{/if}