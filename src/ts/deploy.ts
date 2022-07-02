import {LineBase,makePitakaZip,savePtkOption,loadScript} from "ptk";
export const  deploy=async (lbase:LineBase)=>{
	if (typeof JSZip=='undefined') {
		await loadScript('lazip.js',()=>(typeof JSZip!=='undefined'));	
	}
    const handle=await showSaveFilePicker(savePtkOption);
    const name=handle.name.replace(/\.([^.]+)$/,'');
	const zip=new JSZip();
	lbase.setName(name);
	await lbase.writePages(async (pagefn,buf)=>{
		zip.file(pagefn,buf, {compression:'DEFLATE'});
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
/*
	const zip=JSZip();
	zip.file("hello.txt",buffer);
	zip.file("hello.txt",buffer);
	const content=await zip.generateAsync({type:"blob"});
    const handle=await showSaveFilePicker(saveZipOption);
    const writable = await handle.createWritable();
    await writable.write(content);
    await writable.close();
	console.log('content',content)
*/
