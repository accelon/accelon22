<script>
import {get} from 'svelte/store';
import {pitakas,activepitaka} from './ts/store.js'
export let ptkname;
export let oninsert;
const setActive=n=>{
	if (get(activepitaka)==n) {
		oninsert({detail:{seq:-1,address:'@'+ptkname+'$info',singleton:true}});
		return;
	}
	activepitaka.set(n);
	ptkname=get(pitakas)[n].name;
}

</script>
{#each $pitakas as pitaka,idx}
{idx?'|':''}<span class="clickable" on:click={()=>setActive(idx)} title={pitaka.ptk.name} class:active_clickable={idx==$activepitaka}>{pitaka.ptk.inMem()?'*':''}{pitaka.ptk.humanName()}</span>
{/each}