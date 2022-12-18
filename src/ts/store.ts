import {updateSettings,settings} from './savestore.ts'
import {writable ,get} from 'svelte/store';
import {openPtk,usePtk,loadScript} from 'ptk'
import {addressFromUrl, updateUrl} from './urlhash.ts';
export const maintab=writable('builder');

export const activeword=writable('');
export const panepos=writable(settings.panepos);
export const pitakas=writable([]);
export const activepitaka=writable(-1);
export const lvaddr=writable(addressFromUrl())
export const deployable=writable(true)
export const errormsg=writable('');
export const comimage=writable(null);
export const palitrans=writable(settings.palitrans);
export const tosim=writable(settings.tosim);
export const factorization=writable(settings.factorization);
export const tofind=writable(settings.tofind); //system toolbar tofind
export const parallels=writable(settings.parallels); //parallels setting of each pck
panepos.subscribe((panepos:number)=>updateSettings({panepos}));
tosim.subscribe((tosim:number)=>updateSettings({tosim}));
palitrans.subscribe((palitrans:string)=>updateSettings({palitrans}));
factorization.subscribe((factorization:number)=>updateSettings({factorization}));
tofind.subscribe((tofind:string)=>updateSettings({tofind}));
parallels.subscribe(parallels=>updateSettings({parallels}));


errormsg.subscribe(msg=>{
 	if (msg.length) {
 		setTimeout(()=>{
 			errormsg.set('')
 		},3000)
 	}
});
const locals=(window.accelon22?.preload||'').split(',').filter(it=>!!it);
export const activePtkName=()=>get(pitakas)[get(activepitaka)].name;
export const activePtk=()=>usePtk(activePtkName());
lvaddr.subscribe(lva=>{
	updateUrl(lva);
})
export function addPitaka(ptk,location='local'){
	let arr=get(pitakas);
	arr=arr.filter(it=>it.name!==ptk.name);
	arr.unshift({name:ptk.name,ptk,location});
	pitakas.set(arr);
}
export async function openPitakas() { //a failure will stop loading process
	const out=[],jobs=[];
	for (let i=0;i<locals.length;i++) {
		const ptk=await openPtk(locals[i]);
		out.push({name:ptk.name,ptk,location:'local'});
		jobs.push(loadScript(ptk.name+'/accelon22.css'));
		console.log(ptk)
	}
	await Promise.all(jobs);
	pitakas.set(out);
	out.length&&activepitaka.set(0);
};