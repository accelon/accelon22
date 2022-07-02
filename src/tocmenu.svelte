<script>
import {get} from "svelte/store";
import {VirtualScroll} from "./3rdparty/virtualscroll";
/*
todo : trim level0 if too many

*/
import {scrollY,editorViewport,tocInViewport,scrollToLine} from './ts/editor.ts'
const goline=line=>scrollToLine.set(line);
$: toc=tocInViewport($editorViewport);
</script>
<VirtualScroll data={toc} key="line" height="50vh" let:data>
<div class={"tocitem clickable tocdepth"+data.depth} 
     class:uppertoc={$scrollY>data.line}
     on:click={()=>goline(data.line)}>{data.text}</div>
</VirtualScroll>
