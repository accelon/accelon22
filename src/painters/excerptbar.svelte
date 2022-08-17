<script>
export let ptk;
export let caption;
export let tofind;
export let from;
export let end;
import {EXCERPT_PAGESIZE} from 'ptk';
export let pagesize=EXCERPT_PAGESIZE;
const next=()=>{
	from+=pagesize;
	if (from>end) from=end-1;
}
const prev=()=>{
	from-=pagesize;
	if (from<0) from=0;
}
</script>

<div class=excerptheader>{#if from>0}<span class='clickable' on:click={prev}>⯇</span>{/if}{from+1}/{end}{#if from+pagesize<end}<span class=clickable on:click={next}>⯈</span>{/if}{ptk.humanName()} {caption} {tofind} order by : score, chunk</div>

<style>
.excerptheader {background: var(--excerptbar)}
</style>