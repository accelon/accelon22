<script>
import SplitPane from './3rdparty/splitpane.svelte';
import RightPanel from './rightpanel.svelte'
import LeftPanel from './leftpanel.svelte'
let pos=30;
</script>
<div class="container">
<SplitPane type="horizontal" bind:pos min={15} max={85}>
    <div slot="a">
    	<LeftPanel/>
    </div>
    <div  slot="b">
		<RightPanel/>
    </div>

</SplitPane>
</div>
<style>
    .hide {display:none;}
    .container {height:100vh;}
    /* strange right:0px doesn't work*/
	.systemsetting {position:absolute;z-index: 9999;top:0px;right:0}
</style>