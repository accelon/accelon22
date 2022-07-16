<script>
import {editorViewport,scrollToLine,editorCursor,inputScrollToLine} from './ts/editor.ts'
import {UnicodeBlock} from "ptk"
$: [cursorline,cursorch, ch, linetext] = $editorCursor;

$: unicode=(ch&&(ch.codePointAt(0)||0)>0)?(ch.codePointAt(0)||0).toString(16).toUpperCase():'';
</script>
<div>
<input class="cursorline" value={cursorline} on:input={evt=>inputScrollToLine(evt.target)}/>{(linetext||'').length}:{cursorch}
 U+{unicode}({UnicodeBlock(ch)})
</div>
<style>
	.cursorline {border: none;background: gray ; width: 3em}
</style>