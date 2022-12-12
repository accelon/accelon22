<script>
import {hasLang} from 'ptk';
import StateBtn from '../comps/statebutton.svelte';
import {palitrans,tosim} from '../ts/store.ts';
import {_} from '../ts/textout.ts';
</script>
<StateBtn states={{0:"原文",1:"简體",2:"简体"}} storeid={tosim}/>
{#if hasLang('pp')}
{_("Pali:")}
    <StateBtn states={{'':_("檢約 Provident"),'iast':_("羅馬 Roman"),
    'my':_("緬 ဗမာစာ"),'th':_("泰 ไทย"),'lo':_("寮 ລາວ"),'km':_("柬 ភាសាខ្មែរ"),
    'hi':_("天城 हिन्दी"),'si':_("僧伽羅 සිංහල"),'tb':"藏 བོད་སྐད།"}} storeid={palitrans}/>
{/if}