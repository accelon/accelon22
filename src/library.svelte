<script>
import {LineBase,openPtkOption, RemoteZipStore, ZipStore} from 'ptk'
import {pitakas} from './ts/store.ts';

const openlocalzip=async ()=>{
	const [fileHandle]=await showOpenFilePicker(openPtkOption);
	const file=await fileHandle.getFile();
	const rawfilecontent=await file.arrayBuffer();
	const zip=new ZipStore(new Uint8Array(rawfilecontent));

	const lbase=new LineBase({name, zip});
	await lbase.isReady(); // need this if not start with loadLines

	//const [from,to]=lbase.sectionRange("ztoc.txt")
	await lbase.loadLines(0,10);
	console.log(lbase.slice(0,10));
}
const openremotezip=async()=>{
	const zip=new RemoteZipStore();
	await zip.open("cbeta.zip");
	await zip.load(['001.js','1001.js']);
	console.log(zip.content('001.js').length,zip.content('1001.js').length);
}
</script>

<span class="clickable" on:click={openlocalzip}>local📖</span>
<span class="clickable" on:click={openremotezip}>remote📖</span>
{#each $pitakas as loaded }
	<div>{loaded.ptk.header.zh} {loaded.location}</div>
{/each}
