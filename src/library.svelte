<script>
import {LineBase,openPtkOption, ZipStore} from 'ptk'
import {pitakas} from './ts/store.ts';
import Button from '../comps/button.svelte';

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

</script>
<Button onclick={openlocalzip} title='open 开启'>📖</Button>
config.js preload
{#each $pitakas as loaded }
	<div>{loaded.ptk.name} {loaded.ptk.humanName()} {loaded.location}</div>
{/each}
