<script>
import { onMount } from "svelte";
    import Button from "../comps/button.svelte";
export let ts;
export let filename;
export let ptk;
const setTimestamp=node=>{
    node.currentTime=ts;
}

let video=false;
const playvideo=()=>{
    video=!video;
}
</script>
<Button onclick={playvideo}>🎥</Button>
{#if video}
<video controls autoplay=true use:setTimestamp>
    <source src={ptk.name+'/'+filename} type="audio/mpeg"/>
</video>
{:else}
<audio autoplay=true use:setTimestamp>
    <source src={ptk.name+'/'+filename} type="audio/mpeg"/>
</audio>
{/if}