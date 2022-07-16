<script>
import {getBorderStyle} from '../ts/styling.ts'
// export let key;
export let edge;
export let depth;
export let text;
/* 
simply break offtext into tokens, 
{token, class, handler}

*/
</script>
<div style={getBorderStyle(depth,edge)}> 
{edge} {depth} {text}</div>