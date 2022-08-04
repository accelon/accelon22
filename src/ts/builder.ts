import {LineBaser,saveComOption,savePtkOption,openComOption,loadScript, makePtk,Compiler} from "ptk";
import {sources,editing,NamedBuffer,getEditing} from "./editor.ts";
import {compiler} from "./editorupdate.ts";
import {comimage} from "./store.ts";
import {get} from "svelte/store"
import {fileNameSorter} from "./utils.ts"
let lbaser;
export const hasComImage=()=>!!comimage;
export const getComImage=async(askuser=false)=>{
	let image;
	if (get(comimage)) return true;
	if (location.protocol!=='file:') {
		try {
			const response=await fetch("myself.lua");
			if (response.ok) {
				image=new Uint8Array(await response.arrayBuffer());
			}
		} catch(e) {

		}
	}
	if (!image && askuser) {
    	const [handle]=await showOpenFilePicker(openComOption);
    	if (handle) {
      		const file = await handle.getFile();
      		image=await (file.slice(0, file.size)).arrayBuffer();
    	}
	}
	comimage.set(image);
}
export const  deploy=async (com:false)=>{
    const handle=await showSaveFilePicker(com?saveComOption:savePtkOption);
    const name=handle.name.replace(/\.([^.]+)$/,'');
	if (!lbaser.name) lbaser.setName(name);

	const newimage=makePtk(lbaser,get(comimage));
	buildmessage='creating com '+name;
	let size=0;

    const writable = await handle.createWritable();
    await writable.write(newimage);
    await writable.close();
    size=newimage.length;
	return {name:handle.name,size};
}
export const addSources=(fileHandles)=>{
    const newsources=fileHandles.map(it=>NamedBuffer(it,it.name))
    .filter(it=>!it.name.endsWith('.css') || it.name=='accelon22.css');
    newsources.sort(fileNameSorter);
    sources.set(newsources);
    editing.set(-1);
    editing.set(0);
}
export const addBuffers=async ()=>{
	lbaser=new LineBaser();
	const sourcebuffers=get(sources);
	let errorscount=0;
	compiler.reset();
	for (let i=0;i<sourcebuffers.length;i++) {
		let {name}=sourcebuffers[i];
		const {text}=await getEditing(i);
		compiler.compileBuffer(text,name);
		errorscount+=compiler.compiledFiles[name].errors.length;
		await lbaser.append(text,name.replace('*',''));
	}
	return !errorscount;
}