<script>
import {deployable,getEditingBuffer,editing} from './ts/store.ts'
import {get} from "svelte/store"
// import {build} from "ptk/builder/"
import {deploy} from "./ts/deploy.ts"
const startbuild=()=>{
	deployable.set(true)
	build();
}
const dodeploy=()=>{
	deploy(getEditingBuffer(get(editing)));
}
</script>
<div>
<span on:click={startbuild} class="clickable">🍳</span>
{#if $deployable}
<br/><span on:click={dodeploy} class="clickable">🎁</span>
{/if}
<div id="buildmessage"></div>
</div>