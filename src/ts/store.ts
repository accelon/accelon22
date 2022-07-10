import {updateSettings,settings} from './savestore.ts'
import {derived, writable ,get} from 'svelte/store';
import {LineBase} from 'ptk'

export const panepos=writable(settings.panepos);
export const maintab=writable('library');
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
const preload=(accelon22?.preload||'').split(',');

setTimeout(async()=>{ //a failure will stop loading process
	const out=[];
	for (let i=0;i<preload.length;i++) {
		const lbase = new LineBase({name:preload[i]});
		await lbase.isReady();
		out.push(lbase);
	}
	pitakas.set(out);
},100);