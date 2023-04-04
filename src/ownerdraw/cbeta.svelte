<script>
import Button from "../comps/button.svelte";
import StateBtn from '../comps/statebutton.svelte';
export let ptk;
let canvas, video,img;


const footnoteheight=400;
const columnheight=1444;
const extraleftline = 1;
const extrarightline = 1;
const getPageBox=page=>{
    if (ptk.name=='cb-t') {
        if (page==1) return {left:410,top:200,right:3715,bottom:5136};
    } else {
        if (page==575) return {left:203,top:137,right:735,bottom:1320};
    }
}

const linePerCol=()=>{
    if (ptk.name=='cb-t') return 29;
    if (ptk.name=='yongle') return 10;
    return 1;
}

const Prefix={"cb-t":"大正","yongle":"永樂" };
const States={ "cb-t":{0:"a",1:"b",2:"c"}, "yongle":{0:"a",1:"b"} }
const getImage=()=>{
    const digits={"cb-t":4,"yongle":3 }[ptk.name];
    return ptk.name+"/"+  page.toString().padStart(digits,'0')  +".jpg";
}
const getRatio=()=>{
    if (ptk.name=='cb-t')return 4;
    if (ptk.name=='yongle')return 2;
    return 1;
}
const getColumnHeight=()=>{
    if (ptk.name=='cb-t')return 1444;
    if (ptk.name=='yongle')return 600;
    return 1;
}
const getFirstPage=()=>{
    if (ptk.name=='cb-t')return 1;
    if (ptk.name=='yongle')return 575;
    return 1;
}
const getFirstLine=()=>{
    if (ptk.name=='cb-t')return 7;
    if (ptk.name=='yongle')return 5;
    return 1;
}
let vol=1,page= getFirstPage(),col=0,line=getFirstLine();

const cutout=()=>{
    //video.currentTime=0;
    setTimeout(()=>{
        const cols=linePerCol();
        const box=getPageBox(page);
        const ratio=getRatio();
        const columnheight=getColumnHeight();
        const charwidth= Math.round((box.right-box.left) / cols);
        canvas.width = (charwidth/ratio ) *(extraleftline+extraleftline+1);
        canvas.height = columnheight/ratio ;
        ctx = canvas.getContext('2d');
        const x=box.left+ (cols - line  - extraleftline)*charwidth  ;
        const y=box.top+col*columnheight;
        ctx.drawImage( img, x,  y ,  charwidth*(extraleftline+extraleftline+1) , columnheight,0,0,
        canvas.width,
        canvas.height );
        ctx.beginPath();
        const boxx=(charwidth/ratio)*extraleftline;
        ctx.rect(boxx ,10/ratio, (charwidth/ratio),columnheight/ratio - 40/ratio );
        ctx.lineWith="10";
        ctx.strokeStyle="green";
        ctx.stroke();
    },1)
}
</script>
{ Prefix[ptk.name]}<input bind:value={vol} size="1"  maxlength="2"/> p<input bind:value={page} size="1" maxlength="4"/> 
<StateBtn states={States[ptk.name]} bind:selectedIndex={col}/>
<input bind:value={line} size="1"  maxlength="2"/>

<Button  onclick={()=>cutout()}>截圖</Button>
{#if ptk.name=='cb-t'}
<!-- <Button  onclick={()=>cbetaonline()}>SAT</Button> -->
{/if}
<img bind:this={img} alt="-" width="1" src={getImage()} />
<canvas bind:this={canvas}></canvas>
<!--  <video bind:this={video} width="1">
     <source src={ptk.name+'/T01.mp4'} type="video/mp4"/>
     <track kind="captions">
 </video> -->
