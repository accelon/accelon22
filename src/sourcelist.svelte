<script>
import {onMount} from 'svelte'
import {get} from "svelte/store"
import Button from './comps/button.svelte';
import {errormsg,deployable,comimage} from "./ts/store.ts";
import {editing,editingFilename,sources,editorClean,editingErrors,scrollToLine} from "./ts/editor.ts";
import {setEditingBuffer,discardchanges,compiler,setCompileErrors} from "./ts/editorupdate.ts";
import {openSourceOption,saveSourceOption,verifyPermission,humanBytes} from "ptk"

import {writePtk,inMemoryPtk,compileFiles,addSources,hasComImage,getComImage} from "./ts/builder.ts";

onMount(()=>getComImage()) //try to fetch from 

let readytodeploy=false ,buildcount=0, buildmessage='', ptkimage;
const openfiles=async ()=>{
    const fileHandles=await showOpenFilePicker(openSourceOption);
    if (fileHandles.length) addSources(fileHandles);
    readytodeploy=false;
}
const setDeployable=deployable=>{
	readytodeploy=deployable;
	if (deployable) {
		ptkimage=inMemoryPtk();
	}
	buildmessage=deployable?'ready':'';
}
const inMemoryFile=()=>editingFilename().startsWith('*')
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
	setDeployable(false);
}
const discard=()=>{
	setDeployable(false);
	discardchanges();
}
const startbuild=async ()=>{
	await savefile();
	setDeployable(false);
	const err=await compileFiles();
	if (!err) {
		setDeployable(true);
	} else {
		errormsg.set(err);
	}
	setCompileErrors();
	buildcount++;
}
const compileErrorCount=filename=>{
	if (typeof filename=='undefined') filename=editingFilename();
	const compiled=compiler.compiledFiles[filename];
	return compiled?compiled.errors.length||'':'';
}
const gotoError=(filename)=>{
	if (typeof filename=='undefined') filename=editingFilename();
	const compiled=compiler.compiledFiles[editingFilename()];
	const errors=compiled?compiled.errors:null;

	const line=errors&&errors.length&&errors[0].line;
	line && scrollToLine.set(-(line+2));
}
const dodeploy=async ()=>{
	try{
		const r=await writePtk(ptkimage);
		if (r) {
			buildmessage=r.name+' '+humanBytes(r.size).join(' ');
		}
	}catch(e){
		buildmessage=e;
	}
	setDeployable(false);
}

</script>
<div>
<Button
title="import Sources, 载入源文件" onclick={openfiles} >📂</Button>
{#if !$editorClean}
{#if !inMemoryFile() }
<Button title="Save As, 另存文件"         onclick={savefile}>💾</Button>
{/if}
<Button title="Discard Changes, 放弃修改" onclick={()=>discard()}>🗑</Button>
{/if}


{#if readytodeploy}
	<Button onclick={dodeploy} title="Deploy 打包存档" >📦</Button>
{:else}
	{#if !$editingErrors.length}
	<Button onclick={startbuild} title="Produce 生成" >🏭</Button>
	{/if}
{/if}

{buildmessage}
<br/>
<div class="sourcelist">
{#each $sources as source,idx}
<div class:active_clickable={idx==$editing} class="clickable" 
on:click={()=>changefile(idx)}>{source.name} <span on:click={()=>gotoError(source.name)} class='errorcount'>{compileErrorCount(source.name,buildcount)}</span>
</div>
{/each}
</div>
</div>

<style>
	.sourcelist {height: 50vh;overflow-y: auto}

</style>