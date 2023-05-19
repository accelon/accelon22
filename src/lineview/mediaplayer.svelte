<script>
import { onMount } from "svelte";
import Button from "../comps/button.svelte";
import {youtubelogo} from "../comps/icons";
export let ts;
export let ptk;
export let line;

const {youtubeOfID, mpegfileOfID,parseTimeStamp,subtitleOfID} = ptk.template;
let youtube='';
const id=ptk.nearestTag(line,'mpeg','id');
const filename=mpegfileOfID(id);

const [start,end]=parseTimeStamp(ts);
let subtitleurl=null
const setTimestamp=node=>{
    node.currentTime= start;
}
onMount(async ()=>{
    subtitleurl=await subtitleOfID(ptk,id);
    youtube=await youtubeOfID(ptk,id);
})
let video=false;
const playvideo=()=>{
    video=!video;
}
</script>
{#if youtube}
<a href={'https://youtube.com/watch?v='+youtube+'&t='+Math.floor(start)+'s'} target="_new">{@html youtubelogo}</a>

{:else}
{#if video}
<Button onclick={playvideo}>🎥</Button>
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
{/if}