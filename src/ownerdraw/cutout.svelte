<script>
import Button from "../comps/button.svelte";
import StateBtn from '../comps/statebutton.svelte';
import {usePtk} from 'ptk'
import { onMount } from "svelte";
export let addr;
let ptk,vol,page,col,line;

const parseAddress=addr=>{
    let  [m0,cor,v,p,c,l]=addr.match(/([A-Z])(\d\d)p(\d+)([abcd])(\d+)/);
    vol=parseInt(v);
    page=parseInt(p);
    col= c.toLowerCase().charCodeAt(0) - 0x61;
    line=parseInt(l);
    ptk=usePtk(  {'T':'cb-t','P':'yongle','Q':'qisha'}[cor] );
}

onMount(()=>{
    parseAddress(addr);
    cutout();
})
let canvas, video,img;

const extraleftline = 1;
const extrarightline = 1;
const getPageBox=page=>{
    if (ptk.name=='cb-t') {
        if (page==1) return {left:410,top:200,right:3715,bottom:5136};
    } else if (ptk.name=='yongle') {
        if (page==575) return {left:203,top:137,right:735,bottom:1320};
    } else if (ptk.name=='qisha') {
        if (page==636) return {left:240,top:256,right:1800,bottom:2654};
    }
}

const linePerCol=()=>{
    if (!ptk) return;
    if (ptk.name=='cb-t') return 29;
    if (ptk.name=='yongle') return 10;
    if (ptk.name=='qisha') return 18;
    return 1;
}

const States={ "cb-t":{0:"上",1:"中",2:"下"}, "yongle":{0:"上",1:"下"} , "qisha":{0:"上",1:"下"}  }
const getImage=(ptk)=>{
    if (!ptk) return;
    const digits={"cb-t":4,"yongle":3 }[ptk.name];
    const fn=ptk.name+"/"+ vol+'p'+ page.toString().padStart(digits,'0')  +".jpg";
    return fn;
}
const getRatio=()=>{
    if (!ptk) return;
    if (ptk.name=='cb-t')return 4;
    if (ptk.name=='yongle')return 2;
    if (ptk.name=='qisha')return 4;
    return 1;
}
const getColumnHeight=()=>{
    if (!ptk) return;
    if (ptk.name=='cb-t')return 1444;
    else if (ptk.name=='yongle')return 600;
    else if (ptk.name=='qisha')return 1200;
    return 1;
}

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
        // const boxx=(charwidth/ratio)*extraleftline;
        // ctx.rect(boxx ,10/ratio, (charwidth/ratio),columnheight/ratio - 40/ratio );
        // ctx.lineWith="10";
        // ctx.strokeStyle="green";
        // ctx.stroke();
    },1)
}
</script>
{#key ptk}
<div id="controls">
<input bind:value={vol} size="1"  maxlength="2"/>
<br/><input bind:value={page} size="1" maxlength="4"/> 
<StateBtn states={States[ptk?.name]} bind:selectedIndex={col}/>

<br/><input bind:value={line} size="1"  maxlength="2"/>
<br/><Button  onclick={()=>cutout()}>{ ptk?.attributes.zh}</Button><br/>
<img bind:this={img} alt="-" width="1" height="1" src={getImage(ptk)} />
<canvas bind:this={canvas} height="1"></canvas>
</div>

    <!--  <video bind:this={video} width="1">
         <source src={ptk.name+'/T01.mp4'} type="video/mp4"/>
         <track kind="captions">
     </video> -->
{/key}
<style>
#controls {display:block}
</style>