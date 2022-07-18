<script>
import {onMount,onDestroy} from 'svelte'
import {get} from 'svelte/store'
import VirtualTable from './3rdparty/virtualtable.svelte'
import {editorViewport,scrollToLine,editorCursor,getEditing,getEditingSync} from './ts/editor.ts'
export let data=[];
let fields=data.shift();
export let idx;
let start=0,end=10 , vt;

const scrollToIndex=line=>{
  line&&vt&&vt.scrollToIndex(line);
  scrollToLine.set(0);
}
$: scrollToIndex(Math.abs($scrollToLine));

onMount(async ()=>{
  const {mode,state}=await getEditing(idx);
  setTimeout(()=>{
        vt.scrollToIndex( state.start,{behavior:'auto'} );
  });
});
onDestroy(()=>{
  const {state}=getEditingSync(idx);
  state.start=start;
});

$: editorViewport.set([start,end]);
</script>

<VirtualTable bind:this={vt} items={data} bind:start bind:end>
        <tr slot="thead">
        	{#each fields as f}
        	<th>{f}</th>
        	{/each}
        </tr>
        <tr slot="tbody" let:item let:index class={"oddeven"+index%2}>
        	{#each item as f}
        	<td>{f}</td>
        	{/each}
        </tr>
    </VirtualTable>
<style>
	.oddeven0 {background-color: #555555;}
</style>