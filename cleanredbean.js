import {nodefs,makePitakaZip,deepReadDir} from 'ptk/nodebundle.cjs'
import JSZip from "lazip"
await nodefs
const comname='accelon22.com';
const neededFiles=".symtab".split(',')

const distfolder='dist';
const createCleanCom=async ()=>{
	const distFiles=(await deepReadDir(distfolder)).flat().filter(it=>it.indexOf('hzpx')==-1);
	console.log(distFiles.length,'files',distFiles.slice(0,12))
	const zip=new JSZip();
	const file=fs.readFileSync("redbean.com"); //original version
	await zip.loadAsync(file);
	const firstFileOffset=zip.firstFileOffset;
	const redbeanbuf=file.slice(0,firstFileOffset||0);
	for (let i in zip.files) {
		if ( i=='.symtab' || i.endsWith('.lua')|| i.startsWith('tool')||i.startsWith('usr')
			||i.startsWith('redbean.justine.lol')||i.startsWith('.lua')
			||i.endsWith('.png') || i.endsWith('.txt')
			||i.endsWith('.ico') ) zip.remove(i);
	}

	distFiles.forEach(f=> {
		const content=fs.readFileSync(f,'utf8')
		// compress all js not with packed numbers
		const compression=(f.endsWith('.js')&&content.indexOf('0x0e')==-1 )? 'DEFLATE' :'STORE';
		zip.file(f.slice(distfolder.length+1),content,{compression})
	});

	const newzipbuf=new Uint8Array(await zip.generateAsync({firstFileOffset, type:'arraybuffer'}));

	const filebuf=[...redbeanbuf, ...newzipbuf  ]

	fs.writeFileSync(comname,new Uint8Array(filebuf));
	console.log(comname,'created size',filebuf.length)
}
await createCleanCom();