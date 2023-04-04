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
        } else if (ptk.name=='yongle') {
            if (page==575) return {left:203,top:137,right:735,bottom:1320};
        } else if (ptk.name=='qisha') {
            if (page==636) return {left:120,top:137,right:900,bottom:1327};
        }
    }
    
    const linePerCol=()=>{
        if (ptk.name=='cb-t') return 29;
        if (ptk.name=='yongle') return 10;
        if (ptk.name=='qisha') return 18;
        return 1;
    }
    
    const Prefix={"cb-t":"大正","yongle":"永樂" };
    const States={ "cb-t":{0:"a",1:"b",2:"c"}, "yongle":{0:"a",1:"b"} , "qisha":{0:"a",1:"b"}  }
    const getImage=()=>{
        const digits={"cb-t":4,"yongle":3 }[ptk.name];
        return ptk.name+"/"+ vol+'p'+ page.toString().padStart(digits,'0')  +".jpg";
    }
    const getRatio=()=>{
        if (ptk.name=='cb-t')return 4;
        if (ptk.name=='yongle')return 2;
        if (ptk.name=='qisha')return 2;
        return 1;
    }
    const getColumnHeight=()=>{
        if (ptk.name=='cb-t')return 1444;
        if (ptk.name=='yongle')return 600;
        if (ptk.name=='qisha')return 595;
        return 1;
    }
    const getFirstPage=()=>{
        if (ptk.name=='cb-t')return 1;
        if (ptk.name=='yongle')return 575;
        if (ptk.name=='qisha')return 636;
        return 1;
    }
    const getFirstLine=()=>{
        if (ptk.name=='cb-t')return 14;
        if (ptk.name=='yongle')return 2;
        if (ptk.name=='qisha')return 13;
        return 1;
    }
    const getFirstVol=()=>{
        if (ptk.name=='cb-t')return 1;
        if (ptk.name=='yongle')return 59;
        if (ptk.name=='qisha')return 53;
        return 1;
    }
    const getFirstCol=()=>{
        if (ptk.name=='cb-t')return 0;
        if (ptk.name=='yongle')return 1;
        if (ptk.name=='qisha')return 0;
        return 1;
    }
    let vol=getFirstVol(),page= getFirstPage(),col=getFirstCol(),line=getFirstLine();
    
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
<div id="controls">
<Button  onclick={()=>cutout()}>{ ptk.attributes.zh}</Button>
<input bind:value={vol} size="1"  maxlength="2"/>
<br/>p<input bind:value={page} size="1" maxlength="4"/> 
<StateBtn states={States[ptk.name]} bind:selectedIndex={col}/>
<input bind:value={line} size="1"  maxlength="2"/>
{#if ptk.name=='cb-t'}
<!-- <Button  onclick={()=>cbetaonline()}>SAT</Button> -->
{/if}
</div>
    <img bind:this={img} alt="-" width="1" height="1" src={getImage()} />
    <canvas bind:this={canvas} height="1"></canvas>
    <!--  <video bind:this={video} width="1">
         <source src={ptk.name+'/T01.mp4'} type="video/mp4"/>
         <track kind="captions">
     </video> -->
<style>
#controls {display:block}
</style>