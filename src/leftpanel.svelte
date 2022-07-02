<script>
import {bigfortune} from './comps/pxchars.ts'
import BuilderMain from './buildermain.svelte'
import Library from './library.svelte'
import SourceList from './sourcelist.svelte'
import {errormsg} from './ts/store.ts'
let tab='build';
</script>
<div>
  <div class="tabs">    
    <span class='clickable' class:selected={tab=="sources"} on:click={()=>tab="sources"}>📜</span>
    <span class='clickable' class:selected={tab=="library"} on:click={()=>tab="library"}>📚</span>
    <span class='clickable' class:selected={tab=="build"} on:click={()=>tab="build"}>🛠️</span>
    <span class='clickable' class:selected={tab=="search"} on:click={()=>tab="search"}>🔍</span>
    <span class='clickable' class:selected={tab=="hzpx"} on:click={()=>tab="hzpx"}>{@html bigfortune}</span>
    <span class='clickable' class:selected={tab=="help"} on:click={()=>tab="help"}>❔</span>
    <div class="errormsg">{$errormsg}</div>
  </div>

  <div class="tab-content" class:visible={tab=='sources'}><SourceList/></div>
  <div class="tab-content" class:visible={tab=='library'}><Library/></div>
  <div class="tab-content" class:visible={tab=='build'}><BuilderMain/></div>
  <div class="tab-content" class:visible={tab=='search'}>field and full search result</div>
  <div class="tab-content" class:visible={tab=='hzpx'}>hzpx</div>
  <div class="tab-content" class:visible={tab=='help'}>tutorial </div>
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
}
.errormsg {color: red;transition: color 0.5s;}
</style>