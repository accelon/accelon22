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

<div class="toolbar excerptheader"><span class=clickable on:click={prev}>{from+1}</span>/<span class='clickable' on:click={next}>{end}</span> {ptk.humanName()} {caption} {tofind}</div>

