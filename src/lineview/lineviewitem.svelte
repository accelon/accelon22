<script>
import {getBorderStyle} from '../ts/styling.ts'
import {renderOfftext} from 'ptk';

// export let key;
export let edge;
export let depth;
export let text;

const runits=renderOfftext(text);
// onclick 

/* 
simply break offtext into tokens, 
{token, class, handler}

*/
</script>
<div style={getBorderStyle(depth,edge)}>
{#each runits as ru}<t class={ru.css} idx={ru.at}>{ru.text}</t>{/each}
</div>