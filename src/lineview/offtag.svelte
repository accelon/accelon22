<script>
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
				const innertext=removeBracket(offtext.tagText(tag));
				painters.push([painter,{name, field:typedef.attrs.field, 
					tagname:tag.name, masterid:tag.attrs.id, line:tag.line,
							keys, ptk ,foreign, teinnertextxt , firstchild}]);
			}
		}
	}
	for (let name in tag.attrs) {
		if ( fields[name] ){ 
			const {keys,type,foreign}=fields[name];
			let P=Painters[type];
			if(!Painters[type] &&Painters[tag.name]) {
				P=Painters[tag.name];
			}
			if (!P) continue;
			const innertext=removeBracket(offtext.tagText(tag));
			const props={name, innertext, tagname:tag.name, masterid:tag.attrs.id,line:tag.line,
					keys, type,	ptk,foreign, firstchild, value:tag.attrs[name]}
			painters.push([P,props]);
		}
	}
	painters=painters;
}
$: getPainters(firstchild);
</script>
{#each painters as painter}
<svelte:component this={painter[0]} {after} {seq} 
classes={ptk.name+(painter.tagname?' '+painter.tagname:'')} {...painter[1]}/>
{/each}