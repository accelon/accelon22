<script>
import { createEventDispatcher,setContext } from 'svelte';
import {getLVStyle} from '../ts/styling.ts'
import {renderOfftext} from 'ptk';
import Offtag from './offtag.svelte'
export let edge;
export let depth;
export let text;
export let key;
export let seq;
export let ptkname;
export let firstchild;
export let lva;
const dispatch = createEventDispatcher();

const runits=renderOfftext(text);
// onclick 

/* 
simply break offtext into tokens, 
{token, class, handler}

*/
const insertAddress=(address)=>{
	dispatch('insert',{address,seq})
}
const remove=(lva)=>{
	dispatch('remove',lva)
}

setContext('LV',{ ptkname, seq, insertAddress, remove, firstchild ,lva });

</script>
<div {key} style={"contain: content;"+getLVStyle(depth,edge)}>{depth} {edge}{#each runits as ru}{#if ru.open}<Offtag {ptkname} {firstchild} {seq} tag={ru.open}/>{/if}<t class={ptkname+" "+ru.css} idx={ru.at}>{ru.text}</t>{#if ru.close}<Offtag {ptkname} {firstchild} close=true tag={ru.close}/>{/if}
{/each}
</div>