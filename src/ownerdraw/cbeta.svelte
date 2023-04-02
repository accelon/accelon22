<script>
import Button from "../comps/button.svelte";
export let ptk;
let canvas, video;

const top=414,left=358;
const cutout=()=>{
    // video.style.display = 'block';
    // video.addEventListener('loadeddata', () => {
        video.currentTime=0;
        // video.play();
        setTimeout(()=>{
            // video.pause();
            canvas.width = 500 ;
            canvas.height = 500 ;
            ctx = canvas.getContext('2d');
            ctx.drawImage( video, left,  top,1000, 1000,0,0,500,500 );
        },500)
        // video.style.display = 'none';
    // });

}
</script>
<Button  onclick={()=>cutout()}>Cutout</Button><br/>
<canvas bind:this={canvas}></canvas>
<video bind:this={video} width="1">
    <source src={ptk.name+'/T01.mp4'} type="video/mp4"/>
</video>

<style>
    video {visibility: hidden;}
</style>