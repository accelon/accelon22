<script>
import {onMount} from 'svelte'
onMount(()=>{
  editor = new CodeMirror(document.querySelector('.code'), {
  	value:ACCELON22_SAMPLETEXT,
  	lineNumbers: true, theme:'ambiance'
  });
  
  console.clear();
})
</script>
<div>
<div class="code"></div>	
</div>