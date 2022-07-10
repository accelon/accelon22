import {comimage} from './store';
import {get} from 'svelte/store';

export const makeRedbean=async (JSZip, lbase) :Uint8Array=>{
	const image=get(comimage);
	if (!get(comimage)) return;
	const zip=new JSZip();

	await zip.loadAsync(image);
	const redbeanbuf=new Uint8Array(image.slice(0,zip.firstFileOffset||0));
	const firstFileOffset=zip.firstFileOffset; // redbean binary before this offset
	for (let i in zip.files) {
		if ((i.endsWith('.lua') && i[0]!=='.') //remove lua example but not .init.lua .selfimage.lua
		|| i.startsWith('tool')
		|| i.startsWith('usr')
		|| i.startsWith('redbean.justine.lol')
		|| i.startsWith('.lua')
		|| i.endsWith('.png')
		|| i.endsWith('.txt')
		|| i.endsWith('.ico')) zip.remove(i)

		// const {compressedSize,uncompressedSize}=zip.files[i]._data;
		// const compression= compressedSize==uncompressedSize?'STORE':'DEFLATE';
		// newzip.file(i, zip.files[i].async("string") , {compression});
	}
	await lbase.writePages(async (pagefn,buf)=>{
		zip.file(lbase.name+'/'+pagefn,buf, {compression:'DEFLATE'});
	})

	const zipbuf=new Uint8Array(await zip.generateAsync({compression:'DEFLATE',firstFileOffset, type:'arraybuffer'}));
	const filebuf=[...redbeanbuf, ...zipbuf ];
	return new Uint8Array(filebuf);
}