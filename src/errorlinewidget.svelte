<script>
export let code;     //error code
export let refline; //line causing this error
export let line;    //line in codemirror
export let msg;
$: line
</script>
<div class='errormessage'>{code} {msg} {~refline?refline:''}</div>
<style>
.errormessage {background: red;color: yellow}
</style>
