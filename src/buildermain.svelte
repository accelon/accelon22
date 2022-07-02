<script>
import {deployable} from "./ts/store.ts";
import {editing,sources} from "./ts/editor.ts";
import {getEditingBuffer} from "./ts/editorupdate.ts";
import {get} from "svelte/store";
import {LineBase} from "ptk"
import {deploy} from "./ts/deploy.ts";

let buildmessage='';
let lbase;
let ready=false;
const startbuild=async ()=>{
	ready=false;
	lbase=new LineBase();
	const sourcebuffers=get(sources);
	
	for (let i=0;i<sourcebuffers.length;i++) {
		const {text,name}=sourcebuffers[i];
		const lines=text.split(/\r?\n/);
		await lbase.addLines(lines,name);
	}
	ready=true;

}
const dodeploy=async ()=>{
	try{
		const r=await deploy(lbase);
		if (r) {
			buildmessage=r.name+' '+r.size+' bytes';
			ready=false;
		}
	}catch(e){
		buildmessage=e;
	}
}
</script>
<div>
<span on:click={startbuild} title="Produce 生成" class="clickable">🏭</span>
{#if ready}
<br/><span on:click={dodeploy} title="Deploy 打包"  class="clickable">🎁</span>
{/if}
<div id="buildmessage">{buildmessage}</div>
</div>