<script>
import {meta_cbeta} from 'ptk/meta/cbeta.ts'; //this is not included in ptk/index.ts
import StateButton from '../comps/statebutton.svelte'
import Button from '../comps/button.svelte'
import InlineText from '../painters/inlinetext.svelte';
import InputNumber from '../comps/inputnumber.svelte'
export let ptk;
let vol=1, page=1, col=0;
let sutra=1, juan=1;
const colstates=({'cb-t': {0:'上',1:'中',2:'下'}}[ptk.header.name] ) || {0:'上',1:'下'};
const onVol=(val,oldv)=>{
    if (oldv==85 && val==84) val=55;  //skip 56~84
    else if (val==56 && oldv==55) val=85;
    [sutra,juan]=meta_cbeta.TaishoJuanFromPage(val, page);
    return val;
}
const onPage=(val)=>{
    const max=meta_cbeta.TaishoMaxPage[ vol];
    if (val>max)  val=max;
    [sutra,juan]=meta_cbeta.TaishoJuanFromPage(vol, val);    
    return val;
}
const clampjuan=(sutra)=>{
    if (sutra==220) return 600;
    const maxjuan=(meta_cbeta.TaishoJuanPage[sutra-1]||[]).length;
    if (maxjuan && juan>maxjuan) juan=maxjuan;
    return maxjuan;
}
const onSutra=(val)=>{
    clampjuan(val);
    [vol,page,col]=meta_cbeta.TaishoPageFromJuan(val, juan);
    return val;
}
const onJuan=(val)=>{
    const max=clampjuan(sutra);
    val= (val>max)?max:val;
    [vol,page,col]=meta_cbeta.TaishoPageFromJuan(sutra,val);
    return val;
}
const opencbetaonline=()=>{
    p=page;
    c=col;
    //往前一欄，確定連到該卷
    if (c==2) {
        p++;
        c=0;
    } else c++;
    let url='https://cbetaonline.dila.edu.tw/zh/' +
      'T'+vol.toString().padStart(2,'0')+'n'+sutra.toString().padStart(4,'0')
      +'_p'+p.toString().padStart(4,'0')+ String.fromCharCode(c+0x61)+'01';
    window.open(url,'_new');
}
$: si=meta_cbeta.getSutraInfo(ptk,sutra);
</script>
{ptk.attributes.zh}<InputNumber onChange={onVol} max={85} bind:value={vol}/>頁<InputNumber onChange={onPage} max={1464} bind:value={page}/><StateButton bind:selectedIndex={col} states={colstates }/>
No<InputNumber onChange={onSutra}  bind:value={sutra} max={2920}/>卷<InputNumber onChange={onJuan}  bind:value={juan} max={600}/>
<br/><InlineText {ptk} text={'^bl【'+(si?.bulei||'')+'】' + '^title【'+(si?.title||'')+'】'+ (si?.author||'')}/>
<Button onclick={opencbetaonline}>Cbeta</Button>