<script>
import { createEventDispatcher,setContext } from 'svelte';
import {getLVStyle} from '../ts/styling.ts'
import Offtags from './offtags.svelte'
import InlineText from './inlinetext.svelte';
export let edge;
export let depth;
export let text;
export let key;
export let choff;
export let ptkname;
export let firstchild;
export let lva;
const dispatch = createEventDispatcher();
// const clickHandlers={note};

const insertAddress=(address)=>{
	dispatch('insert',{address,seq:choff})
}
const remove=(lva)=>{
	dispatch('remove',lva)
}

setContext('LV',{ ptkname, choff, insertAddress, remove, firstchild ,lva });

</script>
<div {key} style={"contain: content;"+getLVStyle(depth,edge)}>
<InlineText {ptkname} {firstchild} {text} before={Offtags} after={Offtags}/>
</div>