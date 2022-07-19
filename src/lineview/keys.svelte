<script>
export let name='';
export let value;
const items=value.split(',');

</script>
{name}{#each items as item}
<span class='clickable'>{item}</span>
{/each}