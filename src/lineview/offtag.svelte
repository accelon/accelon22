<script>
import {onMount} from 'svelte'
import {usePtk} from 'ptk'
import keys from './keys.svelte';
import note from './note.svelte';
import {Painters} from './painters.ts'

let painters=[];
export let offtext;
export let ntag;
export let after;
export let ptkname;
export let firstchild;

const getPainters=()=>{
	const tag=offtext.getTag(ntag);

	const defines=usePtk(ptkname).typedefOf(tag.name);
	if (!defines) return;
	painters.length=0;


	if (tag.active) {
		const painter=Painters[defines.type?.type];
		if (painter) {
			const {keys,type,foreign} = defines.type;
			const text=offtext.tagText(tag);
			painters.push([painter,{name,  tagname:tag.name, masterid:tag.attrs.id,
						keys, ptkname,foreign, text , firstchild}]);
		}
	}

	for (let name in tag.attrs) {
		if ( defines[name] ){
			const {keys,type,foreign}=defines[name];
			if(Painters[type]) {
				painters.push([Painters[type], {name,  tagname:tag.name, masterid:tag.attrs.id,
					keys, type,	ptkname,foreign, firstchild, value:tag.attrs[name]}]);

			}
		}
	}

	painters=painters;
}
$: getPainters(firstchild);
</script>
{#each painters as painter}
<svelte:component this={painter[0]} {after} classes={ptkname+" "+painter.tagname} {...painter[1]}/>
{/each}