<script>
export let name;
export let ptkname;
export let tagname;
export let keys;
export let items;
export let classes;

</script>
{#if items.length}
<span class={ptkname+" "+tagname+" "+name+" keys_start"}>(⮌</span>{#each items as key}
<span class={classes+" clickable "+name}>{" "+keys.get(key)}</span>
{/each}
<span class={ptkname+" "+tagname+" "+name+" keys_end"}>)</span>
{/if}
