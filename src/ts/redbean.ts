import {comimage} from './store';
import {get} from 'svelte/store';

export const makeRedbean=async (JSZip, lbase) :Uint8Array=>{
	const image=get(comimage);
	if (!get(comimage)) return;
	const zip=new JSZip();

	await zip.loadAsync(image);
	const redbeanbuf=new Uint8Array(image.slice(0,zip.firstFileOffset||0));

	const newzip=new JSZip();

	for (let i in zip.files) {
		if (i.endsWith('.lua')) continue;
		if (i.startsWith('tool')) continue;
		if (i.startsWith('usr')) continue;
		if (i.startsWith('redbean.justine.lol')) continue;
		if (i.startsWith('.lua')) continue;
		if (i.endsWith('.png')) continue;
		if (i!=='help.txt' && i.endsWith('.txt')) continue; // must keep help.txt
		if (i.endsWith('.ico')) continue;

		const {compressedSize,uncompressedSize}=zip.files[i]._data;
		const compression= compressedSize==uncompressedSize?'STORE':'DEFLATE';
		newzip.file(i, zip.files[i].async("string") , {compression});
	}

	//distFiles.forEach(f=> newzip.file(f,fs.readFileSync('dist/'+f,'utf8')));

	await lbase.writePages(async (pagefn,buf)=>{
		newzip.file(lbase.name+'/'+pagefn,buf, {compression:'STORE'});
	})

	const newzipbuf=new Uint8Array(await newzip.generateAsync({firstFileOffset
		: zip.firstFileOffset, type:'arraybuffer'}));
	const filebuf=[...redbeanbuf, ...newzipbuf ];
	return new Uint8Array(filebuf);
}