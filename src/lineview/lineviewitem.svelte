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
setContext('LV',{ insertAddress,ptkname});

</script>
<div {key} style={"contain: content;"+getBorderStyle(depth,edge)}>{#each runits as ru}{#if ru.open}<Offtag {ptkname} {seq} tag={ru.open}/>{/if}<t class={ptkname+" "+ru.css} idx={ru.at}>{ru.text}</t>{#if ru.close}<Offtag {ptkname}  close=true tag={ru.close}/>{/if}
{/each}
</div>