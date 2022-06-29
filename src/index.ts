import App from './app.svelte';
const app = new App({target: document.body});
document.querySelector("#bootmessage").innerHTML='';
export default app;