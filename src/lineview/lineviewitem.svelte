<script>
import {getBorderStyle} from '../ts/styling.ts'
import {renderOfftext} from 'ptk';
import Offtag from './offtag.svelte'
export let edge;
export let depth;
export let text;
export let key;
export let ptkname;
const runits=renderOfftext(text);
// onclick 

/* 
simply break offtext into tokens, 
{token, class, handler}

*/

</script>
<div style={"contain: content;"+getBorderStyle(depth,edge)}>{key} {depth} {edge}
{#each runits as ru}{#if ru.open}<Offtag {ptkname} tag={ru.open}/>{/if}<t class={ptkname+" "+ru.css} idx={ru.at}>{ru.text}</t>{#if ru.close}<Offtag {ptkname} close=true tag={ru.close}/>{/if}
{/each}
</div>