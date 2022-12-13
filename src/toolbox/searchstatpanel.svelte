<script>
let value='舌..$..舌'
import SearchStat from './searchstat.svelte'
let tofind='';
const dosearch=()=>{
    tofind=value;
}

</script>
<input bind:value class="input"/>
<button on:click={dosearch} class='big'>統計</button>
<SearchStat {tofind}/>
<style>
.input {width:100%;font-size:120%}
.big {font-size:120%}
</style>