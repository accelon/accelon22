<script>
import Inlinetext from '../painters/inlinetext.svelte';
import {pitakas} from '../ts/store.js'
import { _} from '../ts/textout.ts';
import {github} from '../comps/icons';
const getVerText=ptk=>{
    const vertext= (ptk.taggedLines?.ver)||[] ;
    return vertext
}
const homepage=ptk=>{
    window.open('https://'+(ptk.attributes.repo||'github.com/accelon/'+ptk.name),"target=_new");
}
</script>

{#each $pitakas as pitaka,idx}
<div><span class="excerptheading">{pitaka.ptk.humanName(true)}</span>
<span  title={_("源碼")} class="clickable" on:click={()=>homepage(pitaka.ptk)} >{pitaka.name}<span class="home">{@html github}</span></span>
<span title={_("建置於")}>{pitaka.buildtime.toLocaleDateString()}🏭</span>
<span title={_("換行")}>{pitaka.eot}⏎</span>
<span title={_("文塊")}>{pitaka.chunkcount}❖</span>
<span>{#each getVerText(pitaka.ptk) as text}
<div class="ver"><Inlinetext {text} ptk={pitaka.ptk}/></div>
{/each}</span>
<div class="divider"></div>
</div>
{/each}
<style>
    .home {width:24px;height:24px}
</style>