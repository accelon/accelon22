<script>
import SplitPane from './3rdparty/splitpane.svelte';
import RightPanel from './rightpanel.svelte'
import LeftPanel from './leftpanel.svelte'
import FloatPanel from './floatpanel.svelte'
import TocMenu from './tocmenu.svelte'
import {panepos} from './ts/store.ts'
</script>
<div class="container">
<FloatPanel><div slot="a"><TocMenu/></div></FloatPanel>
<SplitPane type="horizontal" bind:pos={$panepos} min={15} max={85}>
    <div slot="a">
    	<LeftPanel/>
    </div>
    <div slot="b">
		<RightPanel/>
    </div>
</SplitPane>
</div>
<style>
    .container {height:100vh }
</style>