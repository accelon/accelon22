import {writable ,derived ,get} from "svelte/store";
import {loadTextInJS} from "./jsonploader.ts"

export const scrollY=writable(0);
export const sources=writable([]);
export const editorClean=writable(true);
export const editorViewport=writable([0,30]);
export const editorCursor=writable([0,0,'','']);
export const scrollToLine=writable(0);
export const editing=writable(-1);
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
export const NamedBuffer = (handle=null,name:string, text='',mode='') =>{
	return {handle,name,text,mode,toc:[], errors:[],state:{}};
}
setTimeout(async()=>{
	try{
		const lexicon=await loadTextInJS('lexicon.js');
		const ztoc= await loadTextInJS('ztoc.js');
		const sample=await loadTextInJS('sample.js');
		const sunzi= await loadTextInJS('sunzi.js');
		sources.set([
			NamedBuffer(null,"*sample.txt",sample),
			NamedBuffer(null,"*lexicon.txt",lexicon,'tabular'),
			NamedBuffer(null,"*ztoc.txt",ztoc),
			NamedBuffer(null,"*sunzi.txt",sunzi),
		]);
		editing.set(0);
	} catch(e) {
		console.error(e);
	}
})

let inputtimer
export const inputScrollToLine=(ele)=>{
	clearTimeout(inputtimer)
	inputtimer=setTimeout(()=>{
		const n=parseInt(ele.value)||0;
		console.log(n)
		scrollToLine.set(-n);
	},200)
}
export const getEditingSync=(n:number)=>{ 
  if (typeof n=='undefined') n= get(editing);
  return get(sources)[n];
}
export const getEditing=async (n:number)=>{
  if (typeof n=='undefined') n= get(editing);
  const namedbuf=get(sources)[n];
  if (!namedbuf) return null;

  const editState=namedbuf.state;
  if (namedbuf.handle) {
      const file = await namedbuf.handle.getFile();
      namedbuf.text=await file.text();
  }
  return namedbuf;
}