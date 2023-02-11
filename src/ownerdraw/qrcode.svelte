<script>
// import {Html5QrcodeScanner,Html5Qrcode} from "html5-qrcode"
import { onMount,onDestroy } from "svelte";
import Button from "../comps/button.svelte";
import {loadScript} from "ptk"
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
$: html5QrcodeScanner=null;
onDestroy(()=>{
    html5QrcodeScanner && html5QrcodeScanner.clear();
})
onMount(async ()=>{
  if (!window.hasOwnProperty('Html5Qrcode')) {
    await loadScript('html5-qrcode.min.js')
  }
  if (!window.hasOwnProperty('Html5Qrcode')) return;
  window.Html5Qrcode.getCameras().then(devices => {
        //ask permissions
        // console.log(devices)
  }).catch(err => {
        alert(err);
  });
  
  html5QrcodeScanner = new window.Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: {width: 250, height: 250, facingMode: "environment" } },
  /* verbose= */ false);

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

});
const gourl=url=>{
  html5QrcodeScanner.clear();
}

</script>
<div id="reader" width="600px"></div>
{#if html5QrcodeScanner}
<Button onclick={()=>gourl(url)}>GO {url}</Button>
{:else}
cannot scan Qrcode, missing module html5-qrcode
{/if}
