<script>
import {onMount} from 'svelte'
import {get} from 'svelte/store'
import * as activeline from './3rdparty/activeline.js'
import {setEditor} from './ts/editorupdate.ts'
import {getEditingSource,editing} from './ts/editor.ts'
import Tabular from './tabular.svelte'
let editor,cmeditor,data;
let mode;
let nonTextEditor;
let scrollToIndex;
const editorByMode=()=>{
  const {text,mode}=getEditingSource(get(editing))
  nonTextEditor=null;
  if (mode=='tabular') {
    document.querySelector('.code').innerHTML=''; //destroy codemirror
    nonTextEditor=Tabular;
    data=text.split('\n').map(item=>item.split('\t'));
    setEditor(null);
    cmeditor=null;
  } else {
    if (!cmeditor) {
      cmeditor = new CodeMirror(document.querySelector('.code'), {
        value:'NO SOURCE', theme:'ambiance',styleActiveLine:true
      })
      setEditor(cmeditor);
    }
  }
}
$: if ($editing>-1) editorByMode($editing);
</script>
<div>
{#if nonTextEditor}
<svelte:component this={nonTextEditor} bind:this={editor} bind:scrollToIndex={scrollToIndex} {data}/>
{/if}
<div class="code"></div>	
</div>