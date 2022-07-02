<script>
import {get} from "svelte/store"
import {errormsg} from "./ts/store.ts";
import {editing,sources,editorClean} from "./ts/editor.ts";
import {setEditingBuffer} from "./ts/editorupdate.ts";
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
const sampleFile=()=>((get(sources)[get(editing)||0])||{name:''}).name.startsWith('*')

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
		const handle = await showSaveFilePicker({suggestedName , ...saveSourceOption});
		await setEditingBuffer(handle)
		editorClean.set(true);
	} catch(e) {

	}
}
</script>
<div>
<span class="clickable" title="import Sources, 载入源文件" on:click={openfiles}>📂</span>
{#if !$editorClean}
{#if !sampleFile() }
<span class="clickable" title="Save As, 另存文件"         on:click={savefile}>💾</span>
{/if}
<span class="clickable discard" title="Discard Changes, 放弃修改" on:click={discardchanges}>🗑</span>
{/if}
<br/><br/>
{#each $sources as source,idx}
<div class:active_clickable={idx==$editing} 
title={sampleFile()?"内存范例，无法储存 Unsavable InMemory Sample":""}
class="clickable" on:click={()=>changefile(idx)}>{source.name}
</div>
{/each}
</div>
<style>
	.discard {float: right;padding-right: 1em;}
</style>