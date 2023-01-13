<script>
import BMEResult from './bmeresult.svelte';
import {pitakas} from '../ts/store.js'
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
{#if $pitakas.length>1}<span title={ptk.humanName()}>{ptk.humanName(true)}</span>{/if}
<span class="field">{caption}</span> <span class="hitcount">{items.length}</span> <BMEResult {seq} {backref} {items} {name} {tagname} {lexicon} {ptk} {tofind} {foreign}/>