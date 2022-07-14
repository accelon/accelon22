<script>
import {onMount} from 'svelte'
import {get} from "svelte/store"
import {errormsg,deployable,comimage} from "./ts/store.ts";
import {editing,sources,editorClean,editingErrors,scrollToLine} from "./ts/editor.ts";
import {setEditingBuffer,discardchanges} from "./ts/editorupdate.ts";
import {openSourceOption,saveSourceOption,verifyPermission,humanBytes} from "ptk"

import {deploy,addBuffers,addSources,hasComImage,getComImage} from "./ts/builder.ts";

onMount(()=>getComImage()) //try to fetch from 

let readytodeploy=false;
const openfiles=async ()=>{
    const fileHandles=await showOpenFilePicker(openSourceOption);
    if (fileHandles.length) addSources(fileHandles);
    readytodeploy=false;
}
const inMemoryFile=()=>((get(sources)[get(editing)||0])||{name:''}).name.startsWith('*')
const changefile=async idx=>{
	if (inMemoryFile())	await savefile(); //auto save inMemoryFile
	if (get(editorClean)) editing.set(idx);
	else errormsg.set('Save/Discard 储存或放弃');
}
const savefile=async ()=>{
	if (inMemoryFile()) {
		await setEditingBuffer();
	} else {
		const fileHandle=get(sources)[get(editing)].handle;
		if (fileHandle) {
			await verifyPermission(fileHandle, true);
			await setEditingBuffer(fileHandle);		
		}
	}
	readytodeploy=false;
}
const discard=()=>{
	readytodeploy=false;
	discardchanges();
}
const startbuild=async ()=>{
	readytodeploy=false;
	await addBuffers();
	readytodeploy=hasComImage();
}
const dodeploy=async ()=>{
	try{
		const r=await deploy();
		if (r) {
			buildmessage=r.name+' '+humanBytes(r.size).join(' ');
		}
	}catch(e){
		buildmessage=e;
	}
	readytodeploy=false;
}
$: buildmessage=$comimage?(readytodeploy?"打包存档":"生成"):"选程序底本";
</script>
<div>
<span class="clickable" title="import Sources, 载入源文件" on:click={openfiles}>📂</span>
{#if !$editorClean}
{#if !inMemoryFile() }
<span class="clickable" title="Save As, 另存文件"         on:click={savefile}>💾</span>
{/if}
<span class="clickable discard" title="Discard Changes, 放弃修改" on:click={()=>discard()}>🗑</span>
{/if}


{#if readytodeploy}
	<span on:click={dodeploy} title="Deploy 打包存档"  class="clickable">🎁</span>
{:else if $comimage}
	{#if !$editingErrors.length}
	<span on:click={startbuild} title="Produce 生成" class="clickable">🏭</span>
	{/if}
{:else}
	<span on:click={()=>getComImage(true)} title="Select Image 选程序底本" class="clickable">🚧</span>
{/if}

{buildmessage}
<br/>
<div class="sourcelist">
{#each $sources as source,idx}
<div class:active_clickable={idx==$editing} class="clickable" 
on:click={()=>changefile(idx)}>{source.name}
</div>
{/each}
</div>
</div>

<style>
	.sourcelist {height: 50vh;overflow-y: auto}

</style>