<script>
import {onMount} from 'svelte'

import {setEditor} from './ts/editorupdate.ts'
let editor;
onMount(()=>{
  editor = new CodeMirror(document.querySelector('.code'), {
  	value:'NO SOURCE',
  	lineNumbers: true, theme:'ambiance'
  })
  setEditor(editor);
  console.clear();
  
})


</script>
<div>
<div class="code"></div>	
</div>