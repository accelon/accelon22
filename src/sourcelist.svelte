<script>
import {get} from "svelte/store"
import {editing,sources,errormsg} from "./ts/store.ts";
import {editorClean} from "./ts/editor.ts";
import {openSourceOption,saveSourceOption} from "ptk/platform/chromefs.ts"
const openfiles=async ()=>{
    const fileHandles=await showOpenFilePicker(openSourceOption);
    if (fileHandles.length) {
	    const newsources=fileHandles.map(it=>{return { name:it.name, handle:it }});
	    sources.set(newsources);
	    editing.set(-1);
	    editing.set(0);
    }
}
const changefile=idx=>{
	if (get(editorClean)) editing.set(idx);
	else errormsg.set('Save/Discard 储存或放弃');
}
const discardchanges=()=>{
	const n=get(editing);
	editing.set(-1);
	editing.set(n); //force clean
}
const savefile=async ()=>{
	const suggestedName=get(sources)[get(editing)].name.replace('*','');
	try {
		await showSaveFilePicker({suggestedName , ...saveSourceOption});
		editorClean.set(true);
	} catch(e) {

	}
}
</script>
<div>
<span class="clickable" title="import Sources, 载入源文件" on:click={openfiles}>📂</span>
{#if !$editorClean}
<span class="clickable" title="Save As, 另存文件"         on:click={savefile}>💾</span>
<span class="clickable discard" title="Discard Changes, 放弃修改" on:click={discardchanges}>🗑</span>
{/if}
<br/><br/>
{#each $sources as source,idx}
<div class:active_clickable={idx==$editing} 
class="clickable" on:click={()=>changefile(idx)}>{source.name}</div>
{/each}
</div>
<style>
	.discard {float: right;padding-right: 1em;}
</style>