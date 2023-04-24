<script>
import { onMount } from 'svelte';
import { get } from 'svelte/store';

export let onclick=null;
export let disabled=false;
export let title='';
export let states={};

export let storeid=null;
export let styles=null;
export let caption='';
let unselectedcaption=caption;
export let unselectable=false;
const statekeys=Object.keys(states);
export let selectedIndex=(storeid && statekeys.indexOf( get(storeid).toString() ))||-1;

if (selectedIndex==-1 && !unselectable) {//invalid value
    selectedIndex=0;    //force to first value
    if (storeid && get(storeid).toString()!==statekeys[selectedIndex]) storeid.set(statekeys[selectedIndex]);
}
const setcaption=()=>{
    if (storeid) caption=states[ get(storeid)]
    else caption=selectedIndex==-1? unselectedcaption:states[selectedIndex];
}
const highlight=(str,selectedIndex)=>{
    if (!styles) return str;
    return str.replace(/\$(\w+)/g,(m,m1)=>{
        if (typeof styles[m1]=='string') {
            return styles[m1];
        }else if (typeof styles=='function') {
            return styles(m1);
        } else {
            return get(styles[m1])||'auto';
        }
    })
}

const click=evt=>{
    if(disabled)return;
    selectedIndex ++;
    if (selectedIndex>= statekeys.length) {
        if (unselectable) {
            if (selectedIndex==-1) selectedIndex=0;
            else selectedIndex=-1;
        }
        else selectedIndex=0;
    }
    if (storeid) storeid.set(statekeys[selectedIndex]);

    onclick&&onclick(selectedIndex);
}
$: setcaption(selectedIndex);
onMount(()=>setcaption());
</script>
<span class="statebutton" class:disabled  class:unselected={selectedIndex==-1} {title} on:click={click} aria-hidden={true}>
    <span>{@html highlight(caption,selectedIndex)}</span>
</span>

