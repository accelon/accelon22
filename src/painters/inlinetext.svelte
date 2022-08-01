<script>
/* just render the offtext , without */
import {getRenderUnitClasses,renderOfftext} from 'ptk';
export let ptkname;
export let firstchild;
export let text='';
export let before,after;
export let extraclass='';
$: runits=renderOfftext(text);

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
let refreshcount=1;
const closestTag=ru=>ru.offtext.getTag(ru.tags[ru.tags.length-1]);

const click=ru=>{
	const tag=closestTag(ru);
	if (!tag) return;
	tag.active=!tag.active;
	refreshcount++;
}
</script>
{#key refreshcount}
{#each runits as ru}<svelte:component this={before} ntags={tagsAt(ru)} {ru} {ptkname} {firstchild}/><t class={getRenderUnitClasses(ru,ptkname,extraclass)} on:click={()=>click(ru)} idx={ru.seq}>{ru.text}</t><svelte:component this={after} ntags={tagsAt(ru,true)} {ru} {ptkname} {firstchild} after={true}/>
{/each}
{/key}

