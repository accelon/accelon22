import {comimage} from './store';
import {get} from 'svelte/store';
import {storeZip, ZipStore} from 'ptk';
const onUpdate=(meta)=>{
	// console.log(meta)
}
export const makeRedbean=async (lbase) :Uint8Array=>{
	const image=get(comimage);
	const sources=[];
	if (!get(comimage)) return;
	const zip=new ZipStore(image);

	const redbeanbuf=new Uint8Array(image.slice(0,zip.zipStart||0));

console.time('zip.file')
	await lbase.writePages((pagefn,buf)=>{
		sources.push({name:lbase.name+'/'+pagefn, content:new TextEncoder().encode(buf)});
	})
console.timeEnd('zip.file')
console.time('zip.generate')
	const newzipbuf = storeZip(sources, {reserve:zip.zipStart});
	newzipbuf.set(redbeanbuf);

console.timeEnd('zip.generate')
	return newzipbuf;
}