<script>
import VirtualTable from './3rdparty/virtualtable.svelte'
import {editorViewport,scrollToLine} from './ts/editor.ts'
export let data=[];
let fields=data.shift();

let start=0,end=10 , vt;
$: editorViewport.set([start,end]);
$: vt&&vt.scrollToIndex(Math.abs($scrollToLine));

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