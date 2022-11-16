<script>
import {getRenderUnitClasses} from 'ptk';	
import {textClasses,_} from '../ts/textout.ts'
import {getContext} from 'svelte'
export let ru;
export let active;
export let ptk;
export let seq;
export let before;
export let after;
export let onUpdate;
export let extraclass;
const LV=getContext('LV');

const click=()=>{
	LV.setActiveword(ru.text);
	const tag=ru.closestTag();
	if (!tag) return;
	tag.active=!tag.active;
	onUpdate&&onUpdate();
}
</script>

<svelte:component this={before} {ru} {seq} {ptk}/><t 
class:activeword={active}
class={getRenderUnitClasses(ru,textClasses(ptk),extraclass)} 
on:click={()=>click()} idx={seq}>{_(ru.text,ptk?.lang)}</t><svelte:component this={after} {seq} {ru} {ptk} after={true}/>