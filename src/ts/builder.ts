import {LineBaser,saveComOption,savePtkOption,openComOption,loadScript, 
	cssSkeleton,makeInMemoryPtk,Compiler,openInMemoryPtk,makeLineBaser} from "ptk";
import {sources,editing,NamedBuffer,getEditing,getSource} from "./editor.ts";
import {compiler} from "./editorupdate.ts";
import {comimage,addPitaka} from "./store.ts";
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

export const inMemoryPtk=()=>{
	accelon22css=getSource('accelon22.css')||cssSkeleton(compiler.typedefs, compiler.ptkname);
	const ptkimage=makeInMemoryPtk(lbaser,accelon22css,get(comimage));
	openInMemoryPtk(lbaser.name,ptkimage).then((ptk)=>{
		addPitaka(ptk,'memory');//update the store
	});
	return ptkimage;
}

export const  writePtk=async (ptkimage)=>{
    const handle=await showSaveFilePicker(get(comimage)?saveComOption:savePtkOption);
    const writable = await handle.createWritable();
    await writable.write(ptkimage);
    await writable.close();
	return {name:handle.name,size:ptkimage.length};
}
export const addSources=(fileHandles)=>{
    const newsources=fileHandles.map(it=>NamedBuffer(it,it.name))
    .filter(it=>!it.name.endsWith('.css') || it.name=='accelon22.css');
    newsources.sort(fileNameSorter);
    sources.set(newsources);
    editing.set(-1);
    editing.set(0);
}
export const compileFiles=async ()=>{
	lbaser=await makeLineBaser(get(sources),compiler, getEditing);
	let errorscount=0;
	for (let n in compiler.compiledFiles) {
		errorscount+=compiler.compiledFiles[n]?.errors?.length;	
	}
	return errorscount?errorscount+' errors':'';
}