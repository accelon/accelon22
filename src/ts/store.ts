import {updateSettings,settings} from './savestore.ts'
import {derived, writable ,get} from "svelte/store";


export const panepos=writable(settings.panepos);

export const deployable=writable(true)
export const errormsg=writable('');
panepos.subscribe(panepos=>updateSettings({panepos}));
errormsg.subscribe(msg=>{
 	if (msg.length) {
 		setTimeout(()=>{
 			errormsg.set('')
 		},3000)
 	}
});

