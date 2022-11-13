<script>
import {getContext} from 'svelte'
export let ptk;
export let masterid;
export let line;
export let seq;
const LV=getContext('LV');

const showmaintext=()=>{
    LV.insertAddress(ptk.footNoteByAddress(masterid,line),seq);
}

</script>

<span class="clickable footnote" on:click={showmaintext}>{masterid}</span>