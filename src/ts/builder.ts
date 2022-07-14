import {LineBase,saveComOption,openComOption,loadScript, makePtk} from "ptk";
import {sources,editing} from "./editor.ts";
import {comimage} from "./store.ts";
import {getEditing} from "./editorupdate.ts";
import {get} from "svelte/store"
import {fileNameSorter} from "./utils.ts"
let lbase;
export const hasComImage=()=>!!comimage;
export const getComImage=async(askuser=false)=>{
	let image;
	if (get(comimage)) return true;
//try fetch
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

    const handle=await showSaveFilePicker(saveComOption);
    const name=handle.name.replace(/\.([^.]+)$/,'');
	if (!lbase.name) lbase.setName(name);

	const newimage=com?makePtk(lbase,comimage):lbase.zip;

	buildmessage='creating com '+name;
	let size=0;

    const writable = await handle.createWritable();
    await writable.write(newimage);
    await writable.close();
    size=newimage.length;
	return {name:handle.name,size};
}
export const addSources=(fileHandles)=>{
    const newsources=fileHandles.map(it=>{return { name:it.name, handle:it }});
    newsources.sort(fileNameSorter);
    sources.set(newsources);
    editing.set(-1);
    editing.set(0);
}
export const addBuffers=async ()=>{
	lbase=new LineBase();
	const sourcebuffers=get(sources);
	for (let i=0;i<sourcebuffers.length;i++) {
		let {name}=sourcebuffers[i];
		const [text]=await getEditing(i)
		await lbase.append(text,name.replace('*',''));
	}
}