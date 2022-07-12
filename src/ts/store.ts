import {updateSettings,settings} from './savestore.ts'
import {derived, writable ,get} from 'svelte/store';
import {LineBase} from 'ptk'

export const maintab=writable('builder');

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
const locals=(accelon22?.locals||'').split(',');

setTimeout(async()=>{ //a failure will stop loading process
	const out=[];
	for (let i=0;i<locals.length;i++) {
		const lbase = new LineBase({name:locals[i]});
		await lbase.isReady();
		out.push({ptk:lbase,location:'local'});
	}
	pitakas.set(out);
},100);