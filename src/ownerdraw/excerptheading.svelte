<script>
import {makeElementId} from 'ptk'
import {getContext} from 'svelte';
import Button from '../comps/button.svelte';

export let id;
export let bkid;
export let tagname;
export let seq;
export let ptk;
export let lineoff;
const LV=getContext('LV');
const openchunk=()=>{
	const scrollto= lineoff?((lineoff>=5)?('>'+(lineoff-1)):'') +(lineoff?':'+lineoff:''):'';	
	const address=ptk.name+':'+makeElementId('bk',bkid)+'.'+tagname+(parseInt(id)?id:'#'+id)+scrollto;
	LV.insertAddress(address,seq);
}

</script>
<Button className='clickable openexcerpt' onclick={openchunk}></Button>