<script>
import {editorViewport,scrollToLine,editorCursor} from './ts/editor.ts'
import {UnicodeBlock} from "ptk"
$: [cursorline,cursorch, ch] = $editorCursor;
let timer;
const goline=ele=>{
	clearTimeout(timer)
	timer=setTimeout(()=>{
		const n=parseInt(ele.value)||0;
		scrollToLine.set(-n);
	},200)
}
$: unicode=(ch&&(ch.codePointAt(0)||0)>0)?' '+(ch.codePointAt(0)||0).toString(16).toUpperCase():'';
</script>
<div>
<input class="cursorline" value={cursorline} on:input={evt=>goline(evt.target)}/>{cursorch} {UnicodeBlock(ch)} {unicode}
</div>
<style>
	.cursorline {border: none;background: gray ; width: 3em}
</style>