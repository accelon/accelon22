import {palitrans,tosim} from './store.ts'
import {get} from 'svelte/store'
import {toSim} from 'lossless-simplified-chinese';
import {offtext2indic} from 'provident-pali';
// import {factorizeText} from 'ptk';

export const textClasses=ptk=>{
	if (!ptk) return '';
	let out=' '+ptk.name;
	if (ptk.lang=='pp') { // pp : provident pali, pli : romanize pali
		const trans=get(palitrans);
		if (trans=='iast') out+=' '+ptk.name+'-iast';
	}
	return out;
}
export const _=(text:string, lang='zh', _sim, _palitrans)=>{
	if (lang==='zh') {
		const sim=(typeof _sim=='undefined')?get(tosim):_sim;
		if (parseInt(sim)) return toSim(text,sim);
	} else if (lang==='pp') {
		const trans=(typeof _palitrans=='undefined')?get(palitrans):_palitrans;
		// if (parseInt(get(factorization))>0) t=factorizeText(text, true ,trans);
        return offtext2indic(text,trans);
    }
    return text;
}