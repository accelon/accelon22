<script>
import {onMount,onDestroy} from 'svelte'
import {setEditor} from './ts/editorupdate.ts'
import {loadCodeMirror} from './ts/codemirror.ts'
let cmeditor;
onMount(async ()=>{
	await loadCodeMirror();
	const codeEle=document.querySelector('.code');
	if (!codeEle) return;
	if (!cmeditor) {
	  cmeditor = new CodeMirror(codeEle, {
	    value:'NO SOURCE', theme:'ambiance',styleActiveLine:true
	  })
	}
	setEditor(cmeditor);
});
onDestroy(()=>{
	setEditor(null);
});
</script>
<div class="code"></div>	