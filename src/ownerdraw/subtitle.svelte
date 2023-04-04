<script>
import Button from "../comps/button.svelte";
export let ptk;
let selected;
const {mpegfileOfID,subtitleOfID} = ptk.template;
const mpegfiles=ptk.defines.mpeg.fields.id.values;
let subtitleurl;
const loadVideo=async (id)=>{
    if (id==selected) {
        selected='';
        return;
    }
    selected='';
    subtitleurl=await subtitleOfID(ptk,id);
    selected=id;
}
</script> 
{#each mpegfiles as mpegfile} 
<Button clicked={mpegfile==selected} onclick={()=>loadVideo(mpegfile)}>{mpegfile+' '}</Button>
{/each}
{#if selected}
    <video controls width="480" autoplay=true>
        <track kind="captions">
        <source src={ptk.name+'/'+mpegfileOfID(selected)} type="audio/mpeg"/>
        <track kind="subtitles" srclang="zh" src={subtitleurl} default/>
    </video>
{/if}