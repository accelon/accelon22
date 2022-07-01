<script>
import {onMount} from 'svelte'
import * as activeline from './3rdparty/activeline.js'
import {setEditor} from './ts/editorupdate.ts'
let editor;
onMount(()=>{
  editor = new CodeMirror(document.querySelector('.code'), {
  	value:'NO SOURCE', theme:'ambiance',styleActiveLine:true
  })
  setEditor(editor);
  console.clear(); 
})


</script>
<div>
<div class="code"></div>	
</div>