<script>
import {onMount} from 'svelte'
import {VirtualScroll} from './3rdparty/virtualscroll'
import {loadLVA} from 'ptk'

export const getBorderStyle=(depth,edge)=>{
	if (!edge || depth==0)return '';
	const padding=""//padding-left:"+(depth*10)+"px;"
	const style="1px solid hsl("+(depth*60)+",50%,50%);";
	if (edge==1) {
		return padding+"border-top:"+style;
	} else if (edge==2) {
		return padding+"border-bottom:"+style;
	} else if (edge==3) {
		return padding+"border:"+style;
	}
}
export let lva='';
let ready=false
let items=[];
onMount(async ()=>{
	items = await loadLVA(lva);
});
$: ready = items.length;
let list;
</script>
{#if ready}
<VirtualScroll bind:this={list} key="key" keeps={50} data={items} height="95vh" let:data>
{#if (data.edge==1||data.edge==3) && data.depth}<span class='closebutton clickable'>🞪</span>{/if}
<div style={getBorderStyle(data.depth,data.edge)}> 
{data.edge} {data.depth} {data.text}</div>
</VirtualScroll>
{:else}
loading
{/if}

<style>
	.closebutton {float: right; padding-right: 0.5em}
</style>