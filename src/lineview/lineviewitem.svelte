<script>
import { createEventDispatcher,setContext } from 'svelte';
import {getBorderStyle} from '../ts/styling.ts'
import {renderOfftext} from 'ptk';
import Offtag from './offtag.svelte'
export let edge;
export let depth;
export let text;
export let key;
export let seq;
export let ptkname;
export let nextlva;
export let nextlvaseq;
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
const remove=(seq)=>{
	dispatch('remove',seq)
}

setContext('LV',{ ptkname, seq, insertAddress, remove, nextlva ,lva , nextlvaseq});

</script>
<div {key} style={"contain: content;"+getBorderStyle(depth,edge)}>{#each runits as ru}{#if ru.open}<Offtag {ptkname} {nextlva} {seq} tag={ru.open}/>{/if}<t class={ptkname+" "+ru.css} idx={ru.at}>{ru.text}</t>{#if ru.close}<Offtag {ptkname} {nextlva} close=true tag={ru.close}/>{/if}
{/each}
</div>