<script>
import { createEventDispatcher,setContext } from 'svelte';
import {getLVStyle} from '../ts/styling.ts'
import {usePtk,renderOfftext,gerRenderUnitClasses} from 'ptk';
import Offtags from './offtags.svelte'
export let edge;
export let depth;
export let text;
export let key;
export let seq;
export let ptkname;
export let firstchild;
export let lva;
const dispatch = createEventDispatcher();
const runits=renderOfftext(text);

// const clickHandlers={note};

const insertAddress=(address)=>{
	dispatch('insert',{address,seq})
}
const remove=(lva)=>{
	dispatch('remove',lva)
}
let refreshcount=1;
const click=ru=>{
	const tag=closestTag(ru);
	if (!tag) return;
	tag.active=!tag.active;
	refreshcount++;
}

const closestTag=ru=>ru.offtext.getTag(ru.tags[ru.tags.length-1]);
const tagsAt=(ru,closing=false)=>{
	const out=[];
	if (!ru.tags || !ru.tags.length) return '';
	for (let i=0;i<ru.tags.length;i++) {
		const tag=ru.offtext.getTag(ru.tags[i]);
		if (ru.choff == tag.choff + (closing?tag.width-1:0)) {
			out.push(ru.tags[i]);
		}
	}
	return out;
}
setContext('LV',{ ptkname, seq, insertAddress, remove, firstchild ,lva });

</script>
{#key refreshcount}
<div {key} style={"contain: content;"+getLVStyle(depth,edge)}>{#each runits as ru}<Offtags ntags={tagsAt(ru)} {ru} {ptkname} {firstchild}/><t class={gerRenderUnitClasses(ru,ptkname)} on:click={()=>click(ru)} idx={ru.seq}>{ru.text}</t><Offtags ntags={tagsAt(ru,true)} {ru} {ptkname} {firstchild} close={true}/>
{/each}
</div>
{/key}