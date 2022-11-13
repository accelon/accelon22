export const Ownerdraws={};

export const registerOwnerdraw=(name,component)=>{
	if (Ownerdraws[name]) console.warn(name+' already registered, override');
	Ownerdraws[name]=component;
}
export const initOwnerdraws=(obj)=>{ 
	for (let n in obj) {
		registerOwnerdraw(n,obj[n]);
	}
}
