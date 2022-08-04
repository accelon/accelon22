<script>
export let classes='';
export let clickable;
export let text='';
export let onclick;
</script>
{#if clickable}
<span on:click={onclick} class={classes+' clickable '}>{@html text}</span>{:else}<span class={classes+' unclickable'}>{@html text}</span>{/if}