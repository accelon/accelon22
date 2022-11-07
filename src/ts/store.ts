import {updateSettings,settings} from './savestore.ts'
import {derived, writable ,get} from 'svelte/store';
import {openPtk,usePtk} from 'ptk'
import {addressFromUrl, updateUrl} from './urlhash.ts';
export const maintab=writable('library');

export const panepos=writable(settings.panepos);
export const pitakas=writable([]);
export const activepitaka=writable(-1);
export const lvaddr=writable(addressFromUrl())
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
const locals=(accelon22?.preload||'').split(',').filter(it=>!!it);
export const activePtkName=()=>get(pitakas)[get(activepitaka)].name;
export const activePtk=()=>usePtk(activePtkName());
lvaddr.subscribe(lva=>{
	updateUrl(lva);
})
export async function addPitaka(ptk,location='local'){
	let arr=get(pitakas);
	arr=arr.filter(it=>it.name!==ptk.name);
	arr.unshift({name:ptk.name,ptk,location});
	pitakas.set(arr);
}
export async function openPitakas() { //a failure will stop loading process
	const out=[];
	for (let i=0;i<locals.length;i++) {
		const ptk=await openPtk(locals[i]);
		out.push({name:ptk.name,ptk,location:'local'});
	}
	pitakas.set(out);
	out.length&&activepitaka.set(0);
};