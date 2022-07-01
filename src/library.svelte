<script>
import {LaZip,LineBase} from 'ptk'

const openzip=async ()=>{
	const zip=await LaZip("million.zip",JSZip); //JSZip from global bundle
	const lbase=new LineBase({name:'million',zip});
	await lbase.loadLines(10000,10010);
	console.log(lbase.slice(10000,10010));

	// const r=await chrome.runtime.sendMessage({id:'zip',zip:"testzip.zip",filename:"sample.js"});
	// console.log(r)
	
	// const fn=Math.floor(Math.random()*1000).toString().padStart(3,'0')+'.js';
	 // const f=await lazip.fetchFile('million/000.js');

	// console.log((await f.async("string")));
	   // const res=await fetch("testzip",{method:'HEAD'});
    // const filesize=parseInt(res.headers.get('Content-Length'));
    // console.log(filesize) 
}


</script>

<span class="clickable" on:click={openzip}>📖</span>