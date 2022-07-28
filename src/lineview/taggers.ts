import note from './note.svelte'
import keys from './keys.svelte'

export const Taggers={};

export const registerTagger=(name,component)=>{
	if (Taggers[name]) console.warn(name+' already registered, override');
	Taggers[name]=component;

}
export const initTaggers=()=>{ 
	registerTagger('note',note);
	registerTagger('keys',keys);
}
