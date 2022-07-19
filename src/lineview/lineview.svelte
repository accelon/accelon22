<script>
import {loadLVA,loadScript} from 'ptk'
import {onMount} from 'svelte'
import {VirtualScroll} from '../3rdparty/virtualscroll'
import LineViewItem from './lineviewitem.svelte'
export let lva='';
let list,data=[];
onMount(async ()=>{	
	data = await loadLVA(lva);
	if (data.length) {
		const ptkname=data[0].key.replace(/:.+/,'')
		loadScript(ptkname+'/ptk.css');
	}
});
</script>
<VirtualScroll bind:this={list} key="key" keeps={50} {data} height="95vh" let:data={item}>
{#if (item.edge==1||item.edge==3) && item.depth}<span class='closebutton clickable'>🞪</span>{/if}
<LineViewItem {...item} ptkname={item.key.replace(/:.+/,'')}/>
</VirtualScroll>
<style>
	.closebutton {float: right; padding-right: 0.5em}
</style>