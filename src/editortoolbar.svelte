<script>
import CMToolbar from './cmtoolbar.svelte'
import TabularToolbar from './tabulartoolbar.svelte'
import {get} from 'svelte/store'
import {getEditing,editing} from './ts/editor.ts'
let toolbar;
const toolbarByMode=async ()=>{
  const e=await getEditing()
  if (!e)return;
  if (e.mode=='tabular') {
  	toolbar=TabularToolbar;
  } else {
  	toolbar=CMToolbar;
  }
}
$: toolbarByMode($editing);

</script>
<svelte:component this={toolbar}/>