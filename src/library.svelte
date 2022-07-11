<script>
import {LaZip,LineBase,openPtkOption} from 'ptk'
import {pitakas} from './ts/store.ts';

const openzip=async ()=>{
	const [fileHandle]=await showOpenFilePicker(openPtkOption);
	const file=await fileHandle.getFile();
	const zip=await LaZip(file,JSZip); //JSZip from global bundle
	const name=zip.folders[0]; //assumning only have one ptk
	const lbase=new LineBase({name, zip});
	await lbase.isReady(); // need this if not start with loadLines

	const [from,to]=lbase.sectionRange("ztoc.txt")
	await lbase.loadLines(from,to+5);
	console.log(lbase.slice(from,to+5));
}

</script>

<span class="clickable" on:click={openzip}>📖</span>
{#each $pitakas as loaded }
	<div>{loaded.ptk.header.zh} {loaded.location}</div>
{/each}
