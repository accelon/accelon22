<script>
import {hasLang} from 'ptk';
import StateBtn from '../comps/statebutton.svelte';
import {palitrans,tosim,factorization} from '../ts/store.ts';
import {_} from '../ts/textout.ts';
</script>
{_("漢字:")}<StateBtn states={{0:"原本",1:"简體",2:"简体"}} storeid={tosim}/>
{#if hasLang('pp')}
{_("巴利Pali:")}
    <StateBtn states={{'':_("檢約 Provident"),'iast':_("國際梵文轉寫 IAST"),
    'my':_("緬文 ဗမာစာ"),'th':_("泰文 ไทย"),'lo':_("老撾文 ລາວ"),'km':_("柬埔寨文 ភាសាខ្មែរ"),
    'hi':_("天城體 हिन्दी"),'si':_("僧伽羅文 සිංහල"),'tb':"藏文 བོད་སྐད།"}} storeid={palitrans}/>
{/if}