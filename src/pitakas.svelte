<script>
import {get} from 'svelte/store';
import {pitakas,activepitaka} from './ts/store.js'
export let ptkname;
export let oninsert;
const setActive=n=>{
	if (get(activepitaka)==n) {
		oninsert({detail:{seq:-1,address:ptkname+':!',singleton:true}}); //InfoAction
		return;
	}
	activepitaka.set(n);
	ptkname=get(pitakas)[n].name;
}

</script>
{#each $pitakas as pitaka,idx}
{idx?'|':''}<span class="clickable" aria-hidden="true"
class:active_clickable={idx==$activepitaka} 
on:click={()=>setActive(idx)} 
title={pitaka.ptk.name}>{pitaka.ptk.inMem()?'*':''}{pitaka.ptk.humanName(true)}</span>
{/each}