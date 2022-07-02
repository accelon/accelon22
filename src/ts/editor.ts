import {editing,editingtoc} from './store.ts';
import {writable ,get} from "svelte/store";
import {loadTextInJS} from "./jsonploader.ts"

export const scrollY=writable(0);
export const sources=writable([]);
export const editorClean=writable(true);
export const editorViewport=writable([0,30]);
export const editorCursor=writable([0,0,'']);
export const scrollToLine=writable(0);
export const editing=writable(-1);
export const editingtoc=writable([]);

export const tocInViewport=()=>{
	const ancestors=[];
	const toc=get(editingtoc);
	const [from,to]=get(editorViewport);
	const out=[];
	let prevdepth=0;
	for (let i=0;i<toc.length;i++) {
		const {line,name,depth}= toc[i];
		ancestors[depth]=i;

		const inviewport=line>=from && line<=to;
		if (inviewport || depth==0) {
			out.push(toc[i])
		}
	}
	return out;
}
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
