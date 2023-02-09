<script>
// import {Html5QrcodeScanner} from "html5-qrcode"
import { onMount } from "svelte";

$: url='';
function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
  console.log(`Code matched = ${decodedText}`, decodedResult);
  url=decodedText; 
}

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  console.warn(`Code scan error = ${error}`);
}

onMount(()=>{
    if (typeof Html5QrcodeScanner=='undefined') return;
    let html5QrcodeScanner = new window.Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: {width: 250, height: 250} },
  /* verbose= */ false);

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
});
</script>
{#if typeof window.Html5QrcodeScanner=='undefined'}
cannot scan Qrcode, missing module html5-qrcode
{:else}
<div id="reader" width="600px"></div>
{url}
{/if}
