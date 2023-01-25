<script>
export let onclick;
export let className='clickable';
export let title;
</script>
<span class={className} {title} aria-hidden="true" on:click={()=>onclick()}><slot/></span>