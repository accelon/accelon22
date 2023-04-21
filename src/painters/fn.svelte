<script>
import Button from '../comps/button.svelte';
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

<Button className="fn" onclick={showmaintext}>{masterid}</Button>