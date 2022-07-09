<script>
import {get} from "svelte/store"
import {errormsg,deployable} from "./ts/store.ts";
import {editing,sources,editorClean,editingErrors,scrollToLine} from "./ts/editor.ts";
import {setEditingBuffer,getEditingBuffer,discardchanges} from "./ts/editorupdate.ts";
import {openSourceOption,saveSourceOption,verifyPermission} from "ptk"

import {deploy,addBuffers,addSources} from "./ts/builder.ts";
let buildmessage='';

let readytodeploy=false;
const openfiles=async ()=>{
    const fileHandles=await showOpenFilePicker(openSourceOption);
    if (fileHandles.length) addSources(fileHandles);
    readytodeploy=false;
}
const sampleFile=()=>((get(sources)[get(editing)||0])||{name:''}).name.startsWith('*')
const changefile=idx=>{
	if (get(editorClean)) editing.set(idx);
	else errormsg.set('Save/Discard 储存或放弃');
}
const savefile=async ()=>{
	const fileHandle=get(sources)[get(editing)].handle;
	await verifyPermission(fileHandle, true);
	await setEditingBuffer(fileHandle);
}
const startbuild=async ()=>{
	readytodeploy=false;
	await addBuffers();
	buildmessage='';
	readytodeploy=true;
}
const dodeploy=async ()=>{
	try{
		const r=await deploy();
		if (r) {
			buildmessage=r.name+' '+r.size+' bytes';
			readytodeploy=false;
		}
	}catch(e){
		buildmessage=e;
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
{:else}
{#if readytodeploy}
<span on:click={dodeploy} title="Deploy 打包"  class="clickable">🎁</span>
{:else}
<span on:click={startbuild} title="Produce 生成" class="clickable">🏭</span>
{/if}
{/if}
<br/>
<div class="sourcelist">
{#each $sources as source,idx}
<div class:active_clickable={idx==$editing} class="clickable" 
on:click={()=>changefile(idx)}>{source.name}
</div>
{/each}
</div>
</div>
<div class="fileerrors">
{#each $editingErrors as item}
<div><span class="clickable fileerror" 
	on:click={()=>scrollToLine.set(-item.line)}>{item.msg}</span>
{#if item.prev}
<span class="clickable" on:click={()=>scrollToLine.set(-item.prev)}>⤴</span>
{/if}
</div>
{/each}
</div>

<style>
	.sourcelist {height: 50vh;overflow-y: auto}
	.fileerror {color: red}
</style>