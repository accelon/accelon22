<script>
import Keys from './keys.svelte';
export let name;
export let caption;
export let tofind;
export let tagname;
export let keys;
export let ptkname;
export let enummode;
export let items=[];
const humanMode=mode=>mode?mode==1?'中間有':'結尾為':'開頭為'
</script>
<span class="field">{caption}</span>{humanMode(enummode)}「{tofind}」共{items.length}筆：<Keys {items} {keys} {tagname} {ptkname} foreign={name}/>
