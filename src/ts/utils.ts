export const fileNameSorter=(a,b)=>{
    let n1=a.name, n2=b.name;
    const m1=n1.match(/([\d]+)/);
    const m2=n2.match(/([\d]+)/);
    if (m1 && m2 && m1.index==m2.index && n1.slice(0,m1.index)==n2.slice(0,m2.index)) {
        return parseInt(m1[1])-parseInt(m2[1]);
    } else {
        return n1>n2?1:n1<n2?-1:0;
    }
}
export const isMobileDevice=()=>{
    if (!navigator || !navigator.userAgent) return true;
    const agent=navigator.userAgent;
    return ~agent.indexOf('Android')>0||~agent.indexOf('Mobile')
    ~agent.indexOf('iPad')||~agent.indexOf('iPhone')
}

