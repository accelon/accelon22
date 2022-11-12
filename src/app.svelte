<script>
import {onMount} from 'svelte';
// import SplitPane from './3rdparty/splitpane.svelte';
// import LeftPanel from './leftpanel.svelte'
import RightPanel from './rightpanel.svelte'
import FloatPanel from './floatpanel.svelte'
import TocMenu from './tocmenu.svelte'
import {panepos,openPitakas} from './ts/store.ts'
import {editingErrors} from './ts/editor.ts'
import MarkupErrors from './markuperrors.svelte'
import LibraryMain from './librarymain.svelte'
import {isMobileDevice} from './ts/utils.ts'

import {initPainters} from './painters/painters.ts'
import note from './painters/note.svelte'
import f from './painters/f.svelte'
import fn from './painters/fn.svelte'
import keys from './painters/keys.svelte'
import queryresult from './painters/queryresult.svelte'
import key from './painters/key.svelte'; //generic column field
import excerpt from './painters/excerpt.svelte'; 
import confer from './painters/confer.svelte'; 
import titlecount from './painters/titlecount.svelte'; 

initPainters({note,keys,key,queryresult,excerpt,confer,f,fn,titlecount});
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
        <TocMenu/>
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
    .container {height:100vh }
</style>