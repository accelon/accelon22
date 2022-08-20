<script>
import {getRenderUnitClasses} from 'ptk';	
export let ru;
export let ptk;
export let seq;
export let before;
export let after;
export let onUpdate;
export let extraclass;
const click=ru=>{
	const tag=ru.closestTag();
	if (!tag) return;
	
	tag.active=!tag.active;
	onUpdate&&onUpdate();
}
</script>
<svelte:component this={before} {ru} {seq} {ptk}/><t class={getRenderUnitClasses(ru,ptk.name,extraclass)} on:click={()=>click(ru)} idx={seq}>{ru.text}</t><svelte:component this={after} {seq} {ru} {ptk} after={true}/>