<script>
import {onMount} from 'svelte';
import {get} from 'svelte/store';
import CMMain from './cmmain.svelte';
import EditorToolbar from './editortoolbar.svelte';
import {getEditing,editing} from './ts/editor.ts';
import Tabular from './tabular.svelte';
import {setEditor} from './ts/editorupdate.ts';
let data;
let tabular;
const editorByMode=async (idx)=>{
  const e=await getEditing(idx);;
  if (!e) return;
  tabular= e.mode=='tabular';
  if (tabular) data=e.text.split('\n').map(item=>item.split('\t'));
}
$: if ($editing>-1) editorByMode($editing);
</script>
<div>
<EditorToolbar/>
{#if tabular}
<Tabular {data} idx={get(editing)}/>
{:else}
<CMMain/>
{/if}
</div>