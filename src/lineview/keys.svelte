<script>
export let name='';
export let value;
export let keys;
export let classes='';
const items=value.split(',');
const openkey=(keyidx)=>{
	console.log(keyidx,value);
}
</script>
{#each items as item}
<span on:click={()=>openkey(item)} class={classes+' clickable '+name}>{keys.get(item)}</span>
{/each}