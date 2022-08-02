<script>
import {get} from 'svelte/store';
import {pitakas,activepitaka} from './ts/store.js'
export let ptkname;
const setActive=n=>{
	activepitaka.set(n);
	ptkname=get(pitakas)[n].name;
}

</script>
{#each $pitakas as pitaka,idx}
{idx?'|':''}<span class="clickable" on:click={()=>setActive(idx)} class:active_clickable={idx==$activepitaka}>{pitaka.ptk.humanName()}</span>
{/each}