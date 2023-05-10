<script>
import { onMount } from "svelte";
import Button from "../comps/button.svelte";
export let ts;
export let ptk;
export let line;
const {mpegfileOfID,parseTimeStamp,subtitleOfID} = ptk.template;

const id=ptk.nearestTag(line,'mpeg','id');
const filename=mpegfileOfID(id);
const [start,end]=parseTimeStamp(ts);
let subtitleurl=null
const setTimestamp=node=>{
    node.currentTime= start;
}
onMount(async ()=>{
    subtitleurl=await subtitleOfID(ptk,id);
})
let video=false;
const playvideo=()=>{
    video=!video;
}
</script>
<Button onclick={playvideo}>🎥</Button>
{#if video}
<br/><video controls width="480" autoplay=true use:setTimestamp>
    <source src={ptk.name+'/'+filename} type="audio/mpeg"/>
    <track kind="captions">
    <track kind="subtitles" srclang="zh" src={subtitleurl} default/>
</video>
{:else}
<audio autoplay=true use:setTimestamp>
    <source src={ptk.name+'/'+filename} type="audio/mpeg"/>
</audio>
{/if}