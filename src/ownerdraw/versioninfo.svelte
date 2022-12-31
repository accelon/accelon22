<script>
import Inlinetext from '../painters/inlinetext.svelte';
import {pitakas} from '../ts/store.js'
import { _} from '../ts/textout.ts';

</script>

{#each $pitakas as pitaka,idx}
<div><span class="excerptheading">{pitaka.ptk.humanName(true)}</span>
<span>{_("代號:")}{pitaka.name}</span>
<span>{_("建置:")}{pitaka.buildtime.toLocaleDateString()}</span>
<span>{_("行數:")}{pitaka.eot}</span>
<span>{#each pitaka.verTexts as text}
<div><Inlinetext {text} ptk={pitaka.ptk}/></div>
{/each}</span>
<div class="divider"></div>
</div>
{/each}