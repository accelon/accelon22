<script>
import { onMount } from "svelte";
import Button from "../comps/button.svelte";
import {parseOfftext} from "ptk"
export let ts;
export let ptk;
export let line;
const ck=ptk.nearestChunk(line);
const filename=(ck?.caption.endsWith('.mp3')||ck?.caption.endsWith('.mp4'))?ck?.caption:ck?.caption+'.mp4';

const setTimestamp=node=>{
    node.currentTime=ts;
}

const genWebVTT=lines=>{
    const out=['WEBVTT','',''];
    let prev=0;
    for (let i=0;i<lines.length;i++) {
        const [ot,tags]=parseOfftext(lines[i]);
        if (tags.length && tags[0].name=='ts') {
            const sec=parseInt(tags[0].attrs.id);
            const hh=Math.floor(sec/3600).toString();
            const mm=Math.floor( (sec - hh*3600) /60).toString();
            const ss=((sec-hh*3600-mm*60) % 60).toString();
            starttime = hh.padStart(2,'0')+':'+mm.padStart(2,'0')+':'+ss.padStart(2,'0')+'.000';
            if (prev) {
                out[prev]+=' --> '+starttime;
            }
            prev=out.length;
            out.push( starttime )            
        }
        out.push(ot);
    }
    //console.log(out)
    return out.join('\n')
}
let subtitleurl=null
onMount(async ()=>{
    const addr=await ptk.fetchAddress('ck#'+ck.id);
    const blob=new Blob([genWebVTT(addr)],{type:'plain/text'});
    subtitleurl=URL.createObjectURL(blob);
})
let video=false;
const playvideo=()=>{
    video=!video;
}
</script>
<Button onclick={playvideo}>🎥</Button>
{#if video}
<video controls autoplay=true use:setTimestamp>
    <source src={ptk.name+'/'+filename} type="audio/mpeg"/>
    <track kind="subtitles" srclang="zh" src={subtitleurl} default/>
</video>
{:else}
<audio autoplay=true use:setTimestamp>
    <source src={ptk.name+'/'+filename} type="audio/mpeg"/>
</audio>
{/if}