export const updateUrl=(lva, opts)=>{
    window.location.hash='#'+lva;
}

export const addressFromUrl=()=>{
    let hash=window.location.hash;
    if (hash[0]=='#') hash=hash.slice(1);
    const lva=decodeURI(hash);
    return lva; 
}
