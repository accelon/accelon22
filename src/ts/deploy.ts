import { loadScript } from "ptk/utils/loadscript.ts";
import {saveZipOption} from "ptk/platform/chromefs.ts"
export const  deploy=async (buffer:string)=>{
	console.log(buffer.length)
	if (typeof JSZip=='undefined') {
		await loadScript('lazip.js',()=>(typeof JSZip!=='undefined'));	
	}
	const zip=JSZip();
	zip.file("hello.txt",buffer);
	zip.file("hello.txt",buffer);
	const content=await zip.generateAsync({type:"blob"});
    const handle=await showSaveFilePicker(saveZipOption);
    const writable = await handle.createWritable();
    await writable.write(content);
    await writable.close();
	console.log('content',content)
}