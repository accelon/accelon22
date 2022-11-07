<script>
export let ptk;
export let caption;
export let tofind;
export let from;
export let last;
import {EXCERPT_PAGESIZE} from 'ptk';
export let pagesize=EXCERPT_PAGESIZE;
const next=()=>{
	if (from+pagesize>=last) return; //is last page
	from+=pagesize;
	if (from>last) from=last-1;
}
const prev=()=>{
	from-=pagesize;
	if (from<0) from=0;
}
</script>

<div class="toolbar excerptheader"><span class=clickable on:click={prev}>{from+1}</span>/<span class='clickable' on:click={next}>{last}</span> {ptk.humanName()} {caption} {tofind}</div>

