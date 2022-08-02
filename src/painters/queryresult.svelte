<script>
import {usePtk} from 'ptk';
import BMEResult from './bmeresult.svelte';
export let caption;
export let tofind;
export let tagname;
export let ptkname;
export let items=[]; //index in lexicon
export let lexicon;  

</script>
{usePtk(ptkname).humanName()}<span class="field">{caption}</span>({items.length})<BMEResult {items} {tagname} {lexicon} {ptkname} {tofind}/>