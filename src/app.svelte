<script>
import {onMount} from 'svelte';
// import SplitPane from './3rdparty/splitpane.svelte';
// import LeftPanel from './leftpanel.svelte'
import RightPanel from './rightpanel.svelte'
import FloatPanel from './floatpanel.svelte'
// import TocMenu from './tocmenu.svelte'
import {openPitakas} from './ts/store.ts'
import {editingErrors} from './ts/editor.ts'
import MarkupErrors from './markuperrors.svelte'
import LibraryMain from './librarymain.svelte'
import {isMobileDevice} from './ts/utils.ts'

import {initPainters} from './painters/painters.ts'
import {initOwnerdraws} from './ownerdraw/ownerdraw.ts'
import note from './painters/note.svelte'
import f from './painters/f.svelte'
import fn from './painters/fn.svelte'
import keys from './painters/keys.svelte'
import key from './painters/key.svelte'; //generic column field
import confer from './painters/confer.svelte'; 

import excerpt from './ownerdraw/excerpt.svelte'; 
import queryresult from './ownerdraw/queryresult.svelte'
import titlecount from './ownerdraw/titlecount.svelte'; 
import systeminfo from './ownerdraw/systeminfo.svelte'; 
import setting from './ownerdraw/setting.svelte'; 
import unknown from './ownerdraw/unknown.svelte'; 
import info from './ownerdraw/info.svelte'; 
initPainters({note,keys,key,confer,f,fn});
initOwnerdraws({queryresult,excerpt,titlecount,systeminfo,setting,unknown,info});
$: ready=false;

onMount( async ()=>{
    await openPitakas();
    ready=true;
});

</script>
{#if ready}
{#if isMobileDevice()}
<LibraryMain/>
{:else}
    <div class="container">
    <FloatPanel><div slot="a">
    {#if $editingErrors.length}
        <MarkupErrors/>x
    {:else}
        <!-- <TocMenu/> -->
    {/if}
    </div></FloatPanel>

<!--     <SplitPane type="horizontal" bind:pos={$panepos} min={15} max={85}>
        <div slot="a">
            <LeftPanel/>
        </div>
        <div slot="b">
            <RightPanel/>
        </div>
    </SplitPane>
 -->
        <RightPanel/>

     </div>
{/if}
{:else}
Loading...
{/if}
<style>
    .container {height:100vh; overflow-y: auto; }
</style>