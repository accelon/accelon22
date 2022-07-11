import {nodefs,makePitakaZip,deepReadDir} from 'ptk/nodebundle.cjs'
import JSZip from "lazip"
await nodefs
const dev = process.argv[2]=='dev';
const comname=(dev?'dist/':'')+'accelon22'+(dev?'-dev':'')+'.com';

//download from redbean.dev
const redbeancom="redbean.com";
const distfolder='dist';
const locals=[]; //locals pitaka in dist
const makeAccelon22=async ()=>{
	const distFiles=dev?('lazip.js,.args,.init.lua,myself.lua'.split(',').map(it=>distfolder+'/'+it))
	:(await deepReadDir(distfolder)).flat();

	console.log(distFiles.length,'files',distFiles.slice(0,12))
	const zip=new JSZip();
	const file=fs.readFileSync(redbeancom); 
	await zip.loadAsync(file);
	const firstFileOffset=zip.firstFileOffset;
	const redbeanbuf=file.slice(0,firstFileOffset||0);
	for (let i in zip.files) {
		if ( i=='.symtab' ||i.endsWith('.lua')|| i.startsWith('tool')||i.startsWith('usr')
			||i.startsWith('redbean.justine.lol')||i.startsWith('.lua')
			||i.endsWith('.png') || i.endsWith('.txt')
			||i.endsWith('.ico') ) zip.remove(i);
	}

	distFiles.forEach(f=> {
		if (f.endsWith('.com')) return; //do not pack the dev server
		const content=fs.readFileSync(f,'utf8');
		if (f.endsWith('000.js')) {
			const ptkname=f.slice(distfolder.length+1, f.length-7);
			locals.push(ptkname);
		}
		// compress all js not with packed numbers
		const compression=(f.endsWith('.js')&&content.indexOf('0x0e')==-1 )? 'DEFLATE' :'STORE';
		zip.file(f.slice(distfolder.length+1),content,{compression})
	})
	zip.file('config.js' , `window.accelon22={locals:"`+locals.join(',')+'"}');

	const newzipbuf=new Uint8Array(await zip.generateAsync({firstFileOffset, type:'arraybuffer'}));

	const filebuf=[...redbeanbuf, ...newzipbuf  ]

	fs.writeFileSync(comname,new Uint8Array(filebuf));
	console.log(comname,'created size',filebuf.length)
}
await makeAccelon22();