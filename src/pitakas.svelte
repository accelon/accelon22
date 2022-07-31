<script>
import {pitakas,activepitaka} from './ts/store.js'
const setActive=n=>{
	activepitaka.set(n);
}
</script>
{#each $pitakas as pitaka,idx}
<span on:click={()=>setActive(idx)} class:active_clickable={idx==$activepitaka}>{pitaka.ptk.humanName()}</span>
{/each}