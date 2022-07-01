import {editing,editingtoc} from './store.ts';
import {writable ,get} from "svelte/store";

export const editorClean=writable(true);
export const editorViewport=writable([0,30]);
export const editorCursor=writable([0,0,'']);
export const scrollToLine=writable(0);

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