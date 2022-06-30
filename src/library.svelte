<script>
import {LaZip} from 'ptk'

const openzip=async ()=>{
	// const r=await chrome.runtime.sendMessage({id:'zip',zip:"testzip.zip",filename:"sample.js"});
	// console.log(r)
	const lazip=await LaZip("test999.zip",JSZip); //JSZip from global bundle
	const fn=Math.floor(Math.random()*1000).toString().padStart(3,'0')+'.js';
	const f=await lazip.fetchFile(fn);

	console.log(fn,(await f.async("string")).length);
	   // const res=await fetch("testzip",{method:'HEAD'});
    // const filesize=parseInt(res.headers.get('Content-Length'));
    // console.log(filesize) 
}


</script>

<span class="clickable" on:click={openzip}>📖</span>