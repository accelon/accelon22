<script>
import {onMount} from 'svelte'
import {get} from 'svelte/store'

import {setEditor} from './ts/editorupdate.ts'
import {getEditingSource,editing} from './ts/editor.ts'
import Tabular from './tabular.svelte'
import {loadCodeMirror} from './ts/codemirror.ts'

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
  } else if (typeof CodeMirror!=='undefined'){
    const codeEle=document.querySelector('.code');
    if (!codeEle) return;
    if (!cmeditor) {
      cmeditor = new CodeMirror(codeEle, {
        value:'NO SOURCE', theme:'ambiance',styleActiveLine:true
      })
      setEditor(cmeditor);
    }
  }
}
onMount(async ()=>{
  await loadCodeMirror();
  editorByMode($editing)
});
$: if ($editing>-1) editorByMode($editing);
</script>
<div>
{#if nonTextEditor}
<svelte:component this={nonTextEditor} bind:this={editor} bind:scrollToIndex={scrollToIndex} {data}/>
{:else}
<div class="code"></div>	
{/if}
</div>