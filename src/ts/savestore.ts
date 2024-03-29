export const AppPrefix='ACC22.'
export const loadSettings=()=>{
    const panepos=localStorage.getItem(AppPrefix+'panepos')||70;    
    const fontsize=localStorage.getItem(AppPrefix+'fontsize')||100;  
    const palitrans=localStorage.getItem(AppPrefix+'palitrans')||'';
    const tosim=localStorage.getItem(AppPrefix+'tosim')||'0';
    const factorization=parseInt(localStorage.getItem(AppPrefix+'factorization')||'1');
    const tofind=localStorage.getItem(AppPrefix+'tofind')||'';
    let parallels=localStorage.getItem(AppPrefix+'parallels')||'{}';
    try {
        JSON.parse(parallels);
    } catch (e){
        console.log(e);
        parallels='{}';
    }
    return {panepos,palitrans,tosim,factorization,tofind,parallels,fontsize};
}

export const saveSettings=()=>{ //immediate save
    for (let key in settingsToBeSave) {
        localStorage.setItem(key, settingsToBeSave[key]);
        delete settingsToBeSave[key]
    }
    clearTimeout(updateTimer);
    console.log('settings autosaved on',new Date())
}
let updateTimer=0;
const settingsToBeSave={};
export const updateSettings=_settings=>{
    let updated=false,oldval;
    for (let key in _settings) {
        if (_settings.hasOwnProperty(key) ) {
            if (settings[key]!==_settings[key]) {
                let val=_settings[key];
                if (typeof val=='object') {
                    val=JSON.stringify(_settings[key]);
                    oldval=JSON.stringify(settings[key]);    
                }
                if (val!==oldval) {
                    settingsToBeSave[AppPrefix+key]=val;
                    if (typeof _settings[key]=='object') {
                        settings[key]=JSON.parse(JSON.stringify(_settings[key]));
                    } else {
                        settings[key]=_settings[key];
                    }
                    updated=true;
                }    
            }
        }
    }
    if (updated) {
        clearTimeout(updateTimer);
        updateTimer=setTimeout(saveSettings,5000); //autosave in 5 seconds
    }
}

export const settings=loadSettings();
