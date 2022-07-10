import { loadScript } from "ptk/utils/loadscript.ts";
const loaded={};
const jsonp_source=function(header,_payload){
	loaded[header.name]=_payload;
}
window.jsonp_source=jsonp_source;
export const loadTextInJS=async (jsname:string)=>{
	const textfilename='*'+jsname.replace('.js','.txt');
	await loadScript(jsname,()=>{
		if (loaded[textfilename]) return true;
	})
	return loaded[textfilename];
}