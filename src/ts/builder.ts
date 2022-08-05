import {LineBaser,saveComOption,savePtkOption,openComOption,loadScript, makeInMemoryPtk,Compiler,openInMemoryPtk} from "ptk";
import {sources,editing,NamedBuffer,getEditing} from "./editor.ts";
import {compiler} from "./editorupdate.ts";
import {comimage,addPitaka} from "./store.ts";
import {get} from "svelte/store"
import {fileNameSorter} from "./utils.ts"
let lbaser, accelon22css='';
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
	const ptkimage=makeInMemoryPtk(lbaser,compiler,accelon22css,get(comimage));
	openInMemoryPtk(lbaser.name,ptkimage).then((ptk)=>{
		addPitaka(ptk);//update the store
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
export const compileBuffers=async ()=>{
	lbaser=new LineBaser();
	const sourcebuffers=get(sources);
	let errorscount=0;

	const alldefines=[];
	compiler.reset();
	for (let i=0;i<sourcebuffers.length;i++) {
		const buf=sourcebuffers[i];
		const {text}=await getEditing(i);
		if (buf.name.endsWith('.css')) {
			accelon22css=text;
			continue;
		}
		compiler.compileBuffer(text,buf.name);
		errorscount+=compiler.compiledFiles[buf.name].errors.length;
		
		const {name,errors,sourcetype,processed,samepage,preload,defines}=compiler.compiledFiles[buf.name];
		alldefines.push(...defines);
		if (preload) lbaser.header.preload.push(name);

		await lbaser.append(text,name.replace('*',''));
	}
	lbaser.payload=alldefines.join('\n');
	if (!compiler.ptkname) {
		return "missing ptk name";	
	}
	lbaser.setName(compiler.ptkname);
	return errorscount?errorscount+' errors':'';
}