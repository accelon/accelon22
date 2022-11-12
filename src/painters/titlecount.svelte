<script>// see ptk/lineview/titlecountaction.ts
    import {getContext} from 'svelte';
    import ExcerptBar from './excerptbar.svelte';
    export let caption;
    export let name;
    export let items;
    export let seq;
    export let dividx;
    export let ptk;
    export let last;
    export let tofind;
    export let from;
    export let hitcount;
    $: name;
    const LV=getContext('LV');
    let pfrom=from;

    const setFrom=()=>{
        if (pfrom==from) return;
        LV.setFrom(dividx,from);
        pfrom=from;
    }
    $: setFrom(from);
    const newdivision=address=>{
        LV.insertAddress(address,seq);
    }
    const newexcerpt=(chunk)=>{
        LV.insertAAddress(address,seq);
    }
    </script>
    <ExcerptBar {caption} {ptk} {tofind} {last} {hitcount} bind:from/>
    {#each items as item,idx}
    <div>{item.id}.<span class="clickable" on:click={()=>newdivision(item.address)}>{item.title}</span>
        <span class="hitcount" on:click={()=>newexcerpt(item.id)}>{item.count}</span></div>
    {/each}
    