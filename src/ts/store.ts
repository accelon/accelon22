import {updateSettings,settings} from './savestore.ts'
import {derived, writable ,get} from 'svelte/store';
import {openPtk} from 'ptk'

export const maintab=writable('library');

export const panepos=writable(settings.panepos);
export const pitakas=writable([]);

export const deployable=writable(true)
export const errormsg=writable('');
export const comimage=writable(null);
panepos.subscribe(panepos=>updateSettings({panepos}));
errormsg.subscribe(msg=>{
 	if (msg.length) {
 		setTimeout(()=>{
 			errormsg.set('')
 		},3000)
 	}
});
const locals=(accelon22?.locals||'').split(',').filter(it=>!!it);

setTimeout(async()=>{ //a failure will stop loading process
	const out=[];
	for (let i=0;i<locals.length;i++) {
		const ptk=await openPtk(locals[i]);
		out.push({ptk,location:'local'});
	}
	pitakas.set(out);
},100);