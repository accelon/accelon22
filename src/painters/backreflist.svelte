<script>
import {intersects} from 'ptk'    
import RefList from "./reflist.svelte";
//列出所有最有可能一起出現的藥（伙伴藥），按頻次排
//  點伙伴藥 ，合併搜尋
//兩三味藥
//顯示 所有含這些藥的方 數量
//點數字  打開 方的清單 ，方劑名：藥名清單 ，點一下再回原文
//近似方
export let tofind='';  // comma separated
export let ptk,name, backref,tagname,showitemlength;
let column;
const getBackrefList=tf=>{ 
	let out=[];
	painter=RefList;
	const backrefcol=ptk.columns[backref];
	const col = ptk.columns[name];
	const norm_at=col.fieldnames.indexOf('norm');
	let at=col.keys.find(tf);
	if (~norm_at) { // use the norm form
		const norm=col.fieldvalues[norm_at][at];
		if (norm) {
			tf=norm;
			at=col.keys.find(tf);
		}
	}
	if (!~at) return [];
	const at2=backrefcol.keys.find(tf);
	column=backrefcol.fields[0].foreign;
	out=backrefcol.fieldvalues[0][at2];
	return out;
}
const getItems=(tofind)=>{
    const tofinds=tofind.split(',');
    const out=intersects(tofinds.map(it=>getBackrefList(it)));
    return out;
}
$: items= getItems(tofind);

</script>
{#if showitemlength}{items.length}{/if}
<RefList {ptk} {name} {backref} {tagname} {items} {column} {tofind}/>