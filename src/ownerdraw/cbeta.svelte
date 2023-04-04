<script>
import {pitakas,activepitaka} from '../ts/store.js'
import Cutout from './cutout.svelte'

</script>
<div id="cutouts">
{#each $pitakas as pitaka,idx}
<Cutout ptk={pitaka.ptk}/>
{/each}
</div>

<style>
    #cutouts {display:flex;flex-direction: row;}
</style>