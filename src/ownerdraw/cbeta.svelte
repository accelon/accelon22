<script>
import Button from '../comps/button.svelte';
import {pitakas,activepitaka} from '../ts/store.js'
import Cutout from './cutout.svelte'
let now=0;
const Items=[
    ['T01p0001a01',  'Q53p636a01','P59p575a01'],
    ['T01p0001a05',  'Q53p636a03','P59p575a03'],
    ['T01p0001a06',  'Q53p636a04','P59p575a04'],
    ['T01p0001a07',  'Q53p636a05','P59p575a05'],
    ['T01p0001a08',  'Q53p636a06','P59p575a06'],
    ['T01p0001a09',  'Q53p636a08','P59p575a07'],
    ['T01p0001a10',  'Q53p636a09','P59p575a08'],
    ['T01p0001a11',  'Q53p636a09','P59p575a09'],
    ['T01p0001a12',  'Q53p636a11','P59p575a10'],
    ['T01p0001a13',  'Q53p636a12','P59p575b01'],
    ['T01p0001a14',  'Q53p636a13','P59p575b02'],

]
$: item=Items[now];
const prev=()=>{
    if (now>0) now--;
}
const next=()=>{
    if (now <Items.length-1) now++;
}
</script>
<Button onclick={prev}>⏴</Button>
<Button onclick={next}>⏵</Button>
<div id="cutouts">
{#key now}
{#each item as addr}
<Cutout {addr}}/>
{/each}
{/key}
</div>

<style>
    #cutouts {display:flex;flex-direction: row;}
</style>