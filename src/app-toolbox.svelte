<script>
import SplitPane from './3rdparty/splitpane.svelte';
import LeftPanel from './leftpanel.svelte'
import EditorMain from './editormain.svelte';
import {panepos} from './ts/store.ts'
</script>
<div class="container">
    
<SplitPane type="horizontal" bind:pos={$panepos} min={15} max={85}>
    <div slot="a">
        <LeftPanel/>
    </div>
    <div slot="b">
        <EditorMain/>
    </div>
</SplitPane>
</div>
