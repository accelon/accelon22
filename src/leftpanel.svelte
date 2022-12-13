<script>
import {bigfortune} from './comps/pxchars.ts'
import Library from './library.svelte'
import SourceList from './sourcelist.svelte'
import SearchStatPanel from './toolbox/searchstatpanel.svelte'
import {errormsg,maintab} from './ts/store.ts'
</script>
<div>
  <div class="tabs">    
    <!-- <span class='clickable' class:selected={$maintab=="library"} on:click={()=>maintab.set("library")}>📚</span> -->
    <span class='clickable' class:selected={$maintab=="builder"} on:click={()=>maintab.set("builder")}>🛠️</span>
    <span class='clickable' class:selected={$maintab=="search"} on:click={()=>maintab.set("search")}>🔍</span>
    <span class='clickable' class:selected={$maintab=="hzpx"} on:click={()=>maintab.set("hzpx")}>{@html bigfortune}</span>
    <span class='clickable' class:selected={$maintab=="help"} on:click={()=>maintab.set("help")}>❔</span>
    <div class="errormsg">{$errormsg}</div>
  </div>

  <div class="tab-content" class:visible={$maintab=='library'}><Library/></div>
  <div class="tab-content" class:visible={$maintab=='builder'}><SourceList/></div>
  <div class="tab-content" class:visible={$maintab=='search'}><SearchStatPanel/></div>
  <div class="tab-content" class:visible={$maintab=='hzpx'}>hzpx</div>
  <div class="tab-content" class:visible={$maintab=='help'}>tutorial</div>
</div>
<style>
.tabs {--webkit-user-select: none;overflow:hidden  ;
  user-select: none; border-radius: 0.5em;padding-left: 0.3em}
.selected {background: gray;border-radius: 0.25em;}
.tab-content {
  position: absolute;
    /* height:90vh; */
  width:100%;
    /* width:30vw; */
    /* !important; */
  opacity: 0;
  pointer-events: none;
  overflow:hidden;
}
.tab-content.visible {/* can't use visibility due to a weird painting bug in Chrome */
  opacity: 1;
  pointer-events: all;
  position:relative
}
.errormsg {color: red;transition: color 0.5s;}
</style>