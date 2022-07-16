<script>
import CMToolbar from './cmtoolbar.svelte'
import TabularToolbar from './tabulartoolbar.svelte'
import {get} from 'svelte/store'
import {getEditingSource,editing} from './ts/editor.ts'
let toolbar;
const toolbarByMode=()=>{
  const {mode}=getEditingSource(get(editing))
  if (mode=='tabular') {
  	toolbar=TabularToolbar;
  } else {
  	toolbar=CMToolbar;
  }
}

$: if ($editing>-1) toolbarByMode($editing);

</script>
<svelte:component this={toolbar}/>