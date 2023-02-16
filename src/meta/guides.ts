export const MetaGuides={};

export const registerMetaGuide=(name,component)=>{
	if (MetaGuides[name]) console.warn(name+' already registered, override');
	MetaGuides[name]=component;
}
export const initMetaGuide=(obj)=>{ 
	for (let n in obj) {
		registerMetaGuide(n,obj[n]);
	}
}
