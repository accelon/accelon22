<script>
import Button from '../comps/button.svelte';

export let classes='';
export let clickable;
export let text='';
export let onclick;
</script>
{#if clickable}
<Button {onclick} className={classes+' clickable '}>{@html text}</Button>{:else}<span class={classes+' unclickable'}>{@html text}</span>{/if}