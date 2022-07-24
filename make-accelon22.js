import {nodefs,storeZip,ZipStore,deepReadDir} from 'ptk/nodebundle.cjs'
await nodefs
const dev = process.argv[2]=='dev';
const comname=(dev?'dist/':'')+'accelon22'+(dev?'-dev':'')+'.com';

//download from redbean.dev
const redbeancom="redbean.com";
const distfolder='dist';
const locals=[]; //locals pitaka in dist
const makeAccelon22=async ()=>{
//.com must more than 512KB , otherwise windows cannot run
	const distFiles=dev?('.args,codemirror.js'.split(',').map(it=>distfolder+'/'+it))
	:(await deepReadDir(distfolder)).flat();
	console.log(distFiles.length,'files',distFiles.slice(0,12));

	const filecontent=fs.readFileSync(redbeancom); 
	const zip = new ZipStore(filecontent);
	const redbeanbuf=filecontent.subarray(0,zip.zipStart||0);
	const sources=[];
	for (let f of zip.files) {
		const {name}=f;
		if ( name.endsWith('.lua')|| name.startsWith('tool')||name.startsWith('usr')
			||name.startsWith('redbean.justine.lol')||name.startsWith('.lua')
			||name.endsWith('.png') || name.endsWith('.txt')
			||name.endsWith('.ico') ) {
		} continue;
		sources.push(f);
	}
	distFiles.forEach(f=> {
		if (f.endsWith('.com')||f.endsWith('.ptk')||f.endsWith('.zip')) return;
		const content=fs.readFileSync(f);
		if (f.endsWith('000.js')) {
			const ptkname=f.slice(distfolder.length+1, f.length-7);
			locals.push(ptkname);
		}
		const name=f.slice(distfolder.length+1);
		sources.push({name, content});
	})
	sources.push({name:'config.js' , 
		content:new TextEncoder().encode(`window.accelon22={locals:"`+locals.join(',')+'"}')});
	const newzipbuf = storeZip(sources, {reserve:zip.zipStart});
	newzipbuf.set(redbeanbuf);
	fs.writeFileSync(comname,newzipbuf);
	console.log(comname,'created size',newzipbuf.length)
}
await makeAccelon22();