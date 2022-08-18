<script>
import {onMount} from 'svelte'
import {removeBracket} from 'ptk'
import {Painters} from '../painters/painters.ts'

let painters=[];
export let offtext;
export let ntag;
export let after;
export let ptk;
export let firstchild;
export let seq;

const getPainters=()=>{
	const tag=offtext.getTag(ntag);
	const typedef=ptk.typedefOf(tag.name);
	const fields=typedef?.fields;
	if (!fields) return;
	painters.length=0;

	if (tag.active) {
		const painter=Painters[fields.type?.type];
		if (painter) {
			if (fields?.type?.type) {
				const {name,keys,type,foreign} = fields.type;
				const text=removeBracket(offtext.tagText(tag));
				painters.push([painter,{name, field:typedef.attrs.field, tagname:tag.name, masterid:tag.attrs.id,
							keys, ptk ,foreign, text , firstchild}]);
			}
		}
	}

	for (let name in tag.attrs) {
		if ( fields[name] ){
			const {keys,type,foreign}=fields[name];
			if(Painters[type]) {
				const props={name,  tagname:tag.name, masterid:tag.attrs.id,
					keys, type,	ptk,foreign, firstchild, value:tag.attrs[name]}
				painters.push([Painters[type],props]);

			}
		}
	}
	painters=painters;
}
$: getPainters(firstchild);
</script>
{#each painters as painter}
<svelte:component this={painter[0]} {after} {seq} classes={ptk.name+" "+painter.tagname} {...painter[1]}/>
{/each}