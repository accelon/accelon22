<script>
import {usePtk} from 'ptk';
import ReverseKeys from './reversekeys.svelte'
export let after;

export let foreign;//foriegn lexicon
export let field; //column field of foriegn lexicon
export let text;
export let name;
export let keys;
export let tagname;
export let ptkname;
const ptk=usePtk(ptkname);
let items=[], master;
const getRow=()=>{
	const at=keys.find(text.replace(/．.+/,'')); //hack for book title 
	const row=ptk.rowOf(foreign,at,field)[0];
	items=row.value||[];
	master=row.typedef.foreign;
}
getRow();
</script>
{#if after}
<ReverseKeys tagname={ptk.attributes.chunktag} {ptkname} keys={ptk.columns[master].keys}  {items}/>
{/if}