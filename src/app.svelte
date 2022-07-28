<script>
import SplitPane from './3rdparty/splitpane.svelte';
import RightPanel from './rightpanel.svelte'
import LeftPanel from './leftpanel.svelte'
import FloatPanel from './floatpanel.svelte'
import TocMenu from './tocmenu.svelte'
import {panepos} from './ts/store.ts'
import {editingErrors} from './ts/editor.ts'
import MarkupErrors from './markuperrors.svelte'
import LibraryMain from './librarymain.svelte'
import {isMobileDevice} from './ts/utils.ts'
import {initTaggers} from './lineview/taggers.ts'
initTaggers();
</script>

{#if isMobileDevice()}
<LibraryMain/>
{:else}
    <div class="container">
    <FloatPanel><div slot="a">
    {#if $editingErrors.length}
        <MarkupErrors/>x
    {:else}
        <TocMenu/>
    {/if}
    </div></FloatPanel>
    <SplitPane type="horizontal" bind:pos={$panepos} min={15} max={85}>
        <div slot="a">
            <LeftPanel/>
        </div>
        <div slot="b">
            <RightPanel/>
        </div>
    </SplitPane>
    </div>
{/if}
<style>
    .container {height:100vh }
</style>