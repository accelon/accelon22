import {updateSettings,settings} from './savestore.ts'
import {derived, writable ,get} from "svelte/store";
import {loadTextInJS,getLoadedFile} from "./jsonploader.ts"

export const panepos=writable(settings.panepos);
export const scrollToLine=writable(0);
export const scrollY=writable(0);
export const editingtoc=writable([]);
export const editing=writable(-1);
export const sources=writable([]);
export const deployable=writable(true)
panepos.subscribe(panepos=>updateSettings({panepos}));

setTimeout(async()=>{
	const sample=await loadTextInJS('sample.js');
	const sunzi= await loadTextInJS('sunzi.js');
	sources.set([
		{name:"sunzi.txt",text:sunzi},
		{name:"sample.txt",text:sample}
	]);
	editing.set(0)
})


export const getEditingBuffer=(n)=>{
	const namedbuf=get(sources)[n];
	if (!namedbuf) return '';
	const text=getLoadedFile(namedbuf.name);
	return text||'';
}

