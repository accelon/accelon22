
<div class="floatpanel">
	<input size="2"/>
	<slot name="a"></slot>
</div>


<style>
	input {border: none;}
	.floatpanel {opacity: 0.4;position: absolute; right:1.5em;float: right; z-index:99 ; }
	.floatpanel:hover {opacity: 0.9;transition: opacity 0.5s;}
</style>