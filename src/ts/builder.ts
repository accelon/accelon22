import {LineBase,makePitakaZip,savePtkOption,loadScript} from "ptk";
import {sources,editing} from "./editor.ts";
import {getEditingBuffer} from "./editorupdate.ts";
import {get} from "svelte/store"
import {fileNameSorter} from "./utils.ts"
let lbase;
export const  deploy=async ()=>{
	if (typeof JSZip=='undefined') {
		await loadScript('lazip.js',()=>(typeof JSZip!=='undefined'));	
	}
    const handle=await showSaveFilePicker(savePtkOption);
    const name=handle.name.replace(/\.([^.]+)$/,'');
	const zip=new JSZip();
	lbase.setName(name);
	await lbase.writePages(async (pagefn,buf)=>{
		zip.file(pagefn,buf, {compression:'STORE'});
	});

	buildmessage='creating zip '+name;
	let size=0;
	await makePitakaZip(zip, async (buf)=>{
	    const writable = await handle.createWritable();
	    await writable.write(buf);
	    await writable.close();
	    size=buf.length;
	})
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
		const text=await getEditingBuffer(i)
		await lbase.append(text,name.replace('*',''));
	}
}