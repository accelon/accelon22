<script>
import {editorViewport,editorCursor,inputScrollToLine} from './ts/editor.ts'

$: [row] = $editorCursor;
</script>


<input class="row" value={row} on:input={evt=>inputScrollToLine(evt.target)}/>
{$editorViewport}

<style>
	.row {border: none;background: gray ; width: 3em}
</style>