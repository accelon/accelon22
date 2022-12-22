<script>
import BMEResult from './bmeresult.svelte';
export let caption;
export let tofind;
export let name;
export let foreign;
export let tagname;
export let ptk;
export let items=[]; //index in lexicon
export let lexicon; 
export let backref;//reverse lookup
export let seq;
</script>
{ptk.name}<span class="field">{caption}</span>({items.length})<BMEResult {seq} {backref} {items} {name} {tagname} {lexicon} {ptk} {tofind} {foreign}/>