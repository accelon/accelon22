<script>
import {onMount} from 'svelte';
import InlineText from './inlinetext.svelte';
import ExcerptBar from './excerptbar.svelte';
export let caption;
export let name;
export let lines;
export let hits;
export let ptk;
export let tofind;
const PAGE_SIZE=10;
let from=0, pfrom=-1;

$: displayitems=[];

async function load(){
	if (pfrom==from) return;
	const till=from+PAGE_SIZE;
	const loadlines=lines.slice(from,from+PAGE_SIZE);
	await ptk.loadLines(loadlines);

	displayitems=loadlines.map((line,idx)=>{
		return {text:ptk.getLine(line) , hits:hits[from+idx] };
	});
	pfrom=from;
}
onMount(async ()=>{
	await load();
});
$: load(from);
</script>
<!-- todo highlight , abridge text //-->
<ExcerptBar {caption} {ptk} {tofind} max={lines.length} pagesize={PAGE_SIZE} bind:from/>
{#each displayitems as item,idx}
<div><InlineText {...item} {ptk}/></div>
{/each}
