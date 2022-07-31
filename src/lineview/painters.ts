export const Painters={};

export const registerPainter=(name,component)=>{
	if (Painters[name]) console.warn(name+' already registered, override');
	Painters[name]=component;
}
export const initPainters=(obj)=>{ 
	for (let n in obj) {
		registerPainter(n,obj[n]);
	}
}
