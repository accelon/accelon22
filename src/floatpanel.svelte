
<div class="floatpanel">
	<slot name="a"></slot>
</div>


<style>
	
	.floatpanel {opacity: 0.5;position: absolute; right:2em;float: right; z-index:99 ; }
	.floatpanel:hover {opacity: 0.9;transition: opacity 0.5s;}
</style>