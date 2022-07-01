import {updateSettings,settings} from './savestore.ts'
import {derived, writable ,get} from "svelte/store";
import {loadTextInJS,getLoadedFile} from "./jsonploader.ts"

export const panepos=writable(settings.panepos);

export const scrollY=writable(0);
export const editing=writable(-1);
export const editingtoc=writable([]);
export const sources=writable([]);
export const deployable=writable(true)
export const errormsg=writable('');
panepos.subscribe(panepos=>updateSettings({panepos}));
errormsg.subscribe(msg=>{
 	if (msg.length) {
 		setTimeout(()=>{
 			errormsg.set('')
 		},3000)
 	}
});

setTimeout(async()=>{
	try{
		const sample=await loadTextInJS('sample.js');
		const sunzi= await loadTextInJS('sunzi.js');
		const ztoc= await loadTextInJS('ztoc.js');
		sources.set([
			{name:"*ztoc.txt",text:ztoc},
			{name:"*sunzi.txt",text:sunzi},
			{name:"*sample.txt",text:sample},
		]);
		editing.set(0);
	} catch(e) {
		console.error(e);
	}
})

export const getEditingBuffer=async (n:number)=>{
	const namedbuf=get(sources)[n];
	if (!namedbuf) return '';
	if (namedbuf.handle) {
	    const file = await namedbuf.handle.getFile();
    	return await file.text();
	} else {
		const text=getLoadedFile(namedbuf.name);
		return text||'';
	}
}

