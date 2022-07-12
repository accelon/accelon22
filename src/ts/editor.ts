import {writable ,derived ,get} from "svelte/store";
import {loadTextInJS} from "./jsonploader.ts"

export const scrollY=writable(0);
export const sources=writable([]);
export const editorClean=writable(true);
export const editorViewport=writable([0,30]);
export const editorCursor=writable([0,0,'']);
export const scrollToLine=writable(0);
export const editing=writable(-1);
export const getEditingSource=()=>get(sources)[get(editing)]||{};
export const editingErrors=writable([]);
export const setEditingSource =newsource=> get(sources).splice(get(editing) , 1, newsource) ;
export const tocInViewport=()=>{
	const ancestors=[];
	const toc=get(sources)[get(editing)]?.toc||[];
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
		const lexicon=await loadTextInJS('lexicon.js');
		const ztoc= await loadTextInJS('ztoc.js');
		const sample=await loadTextInJS('sample.js');
		const sunzi= await loadTextInJS('sunzi.js');
		sources.set([
			{name:"*sample.txt",text:sample,toc:null,errors:[],cursor:[]},
			{name:"*lexicon.txt",text:lexicon,toc:null,errors:[],cursor:[]},
			{name:"*ztoc.txt",text:ztoc,toc:null,errors:[],cursor:[]},
			{name:"*sunzi.txt",text:sunzi,toc:null,errors:[],cursor:[]},
		]);
		editing.set(0);
	} catch(e) {
		console.error(e);
	}
})
