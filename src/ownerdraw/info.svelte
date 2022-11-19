<script>
export let ptk;
export let items;
</script>
{ptk.name} info
{#each items as item}
{item.text}
{/each}