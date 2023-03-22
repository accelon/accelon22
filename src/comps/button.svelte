<script>
export let onclick;
export let className='clickable';
export let title;
export let clicked;
</script>
<span class={className+(clicked?' clicked':'')} {title} aria-hidden="true" on:click={()=>onclick()}><slot/></span>