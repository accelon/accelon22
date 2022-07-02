<script>
import {LaZip,LineBase,openPtkOption} from 'ptk'
    
const openzip=async ()=>{
	const [fileHandle]=await showOpenFilePicker(openPtkOption);
	const file=await fileHandle.getFile();
	const zip=await LaZip(file,JSZip); //JSZip from global bundle
	const name=zip.folders[0]; //assumning only have one ptk
	const lbase=new LineBase({name, zip});
	await lbase.loadLines(0,10);
	console.log(lbase.slice(0,10));
}


</script>

<span class="clickable" on:click={openzip}>📖</span>