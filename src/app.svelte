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
import {initMetaGuide} from './meta/guides.ts'
import note from './painters/note.svelte';
import n from './painters/n.svelte';//paragraph number
import ck from './painters/ck.svelte';//original text
import j from './painters/j.svelte';//internal jump
import f from './painters/f.svelte';
import o from './painters/o.svelte'; //original text
import fn from './painters/fn.svelte';
import keys from './painters/keys.svelte'
import key from './painters/key.svelte'; //generic column field
import confer from './painters/confer.svelte'; 
import backreflist from './painters/backreflist.svelte';
import backref from './painters/backref.svelte';
import approxbackref from './painters/approxbackref.svelte';
import partialchunkid from './painters/partialchunkid.svelte';

import excerpt from './ownerdraw/excerpt.svelte'; 
import queryresult from './ownerdraw/queryresult.svelte'
import titlecount from './ownerdraw/titlecount.svelte'; 
import systeminfo from './ownerdraw/systeminfo.svelte'; 
import setting from './ownerdraw/setting.svelte'; 
import qrcode from './ownerdraw/qrcode.svelte'; 
import unknown from './ownerdraw/unknown.svelte'; 
import guide from './ownerdraw/guide.svelte'; 
import approx from './ownerdraw/approx.svelte'; 
import subtitle from './ownerdraw/subtitle.svelte';
import cbeta from './ownerdraw/cbeta.svelte';

import cvny from './meta/cvny.svelte';
import kxzd from './meta/kxzd.svelte';

initPainters({note,keys,key,confer,ck,j,n,f,fn,backref,backreflist,approxbackref,partialchunkid,o});
initOwnerdraws({queryresult,excerpt,titlecount,systeminfo,setting,qrcode,unknown,guide,approx,subtitle,cbeta});
initMetaGuide({cvny,kxzd});

$: ready=false;

import {registerServiceWorker} from 'ptk/platform/pwa.js'
registerServiceWorker();

onMount( async ()=>{
    await openPitakas();
    ready=true;
});

</script>
{#if ready}
<LibraryMain/>
{:else}
Loading... <a href="index.html" title="to clear hashtag">Reload</a>
{/if}