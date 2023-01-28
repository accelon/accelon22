<script>
    import {getContext} from 'svelte'
    export let ptk;
    export let line;
    export let seq;
    export let after;
    export let innertext;
    export let value;
    let show=false;
    const LV=getContext('LV');
    const jump= ()=>{
        LV.insertAddress(value,seq);
    }
    </script>   
    {#if after || (!innertext&&!after)}
    <span class="n">{value}</span>
    {/if}