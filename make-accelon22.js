import {nodefs,storeZip,ZipStore,deepReadDir} from 'ptk/nodebundle.cjs'
await nodefs
const dev = process.argv[2]=='dev';
const comname=(dev?'dist/':'')+'accelon22'+(dev?'-dev':'')+'.com';
const distfolder='dist';
const excludes=['dist/kaiu.ttf','dist/html5-qrcode.min.js','dist/sw.js'];
//download from redbean.dev
const redbeancom="redbean.com";

let locals=[]; //locals pitaka in dist
const makeAccelon22=async ()=>{
//.com must more than 512KB , otherwise windows cannot run
	const distFiles=dev?('.args'.split(',').map(it=>distfolder+'/'+it))
	:(await deepReadDir(distfolder)).flat();


	const filecontent=fs.readFileSync(redbeancom); 
	const configjs=fs.readFileSync(distfolder+'/config.js'	,'utf8'); 
	let preload=configjs.match(/preload:"([^\"]+)"/);
	if (preload) {
		preload=preload[1].split(',')
	}

	const zip = new ZipStore(filecontent);
	const redbeanbuf=filecontent.subarray(0,zip.zipStart||0);
	const sources=[];
	for (let f of zip.files) {
		const {name}=f;
		if ( name.endsWith('.lua')|| name.startsWith('tool')||name.startsWith('usr')
			||name.startsWith('redbean.justine.lol')||name.startsWith('.lua')
			||name.endsWith('.png') || name.endsWith('.txt')||name.startsWith('usr/share/zoneinfo')
			||name.startsWith('html5-qrcode.js')
			||name.endsWith('.ico') ||name=='.symtab') continue;
		sources.push(f);
	}

	distFiles.forEach(f=> {	
		const subfile=f.match(/[\\\/]([a-z_\-]+)[\\\/]/);
		const dbid=subfile?subfile[1]:null;
		if (~excludes.indexOf(f)) return;
		if (dbid&&preload.indexOf(dbid)==-1) return; //filter out ptk not specified by config.js

		if (f.endsWith('.com')||f.endsWith('.ptk')||f.endsWith('.zip')) return;
		const content=fs.readFileSync(f);
		if (f.endsWith('000.js')) {
			const ptkname=f.slice(distfolder.length+1, f.length-7);
			locals.push(ptkname);
		}
		const name=f.substring(distfolder.length+1);
		sources.push({name, content});

	})
	console.log(locals,'source files count',sources.map(it=>it.name).length)
	//sources.push({name:'config.js' , 
	//content:new TextEncoder().encode(`window.accelon22={preload:"`+locals.join(',')+'"}')});
	const newzipbuf = storeZip(sources, {reserve:zip.zipStart});
	newzipbuf.set(redbeanbuf);
	fs.writeFileSync(comname,newzipbuf);
	console.log(comname,'size',newzipbuf.length)
}
await makeAccelon22();