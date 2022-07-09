import {nodefs,makePitakaZip} from 'ptk/nodebundle.cjs'
import JSZip from "lazip"
await nodefs
const comname='accelon22.com';
const neededFiles=".symtab".split(',')
const distFiles=fs.readdirSync('./dist');
console.log(distFiles)
const createCleanCom=async ()=>{
	const zip=new JSZip();
	const file=fs.readFileSync("redbean.com"); //original version
	await zip.loadAsync(file);
	const redbeanbuf=file.slice(0,zip.firstFileOffset||0);

	const newzip=new JSZip();

	for (let i in zip.files) {
		if (i.endsWith('.lua')) continue;
		if (i.startsWith('tool')) continue;
		if (i.startsWith('usr')) continue;
		if (i.startsWith('redbean.justine.lol')) continue;
		if (i.startsWith('.lua')) continue;
		if (i.endsWith('.png')) continue;
		if (i!=='help.txt' && i.endsWith('.txt')) continue;
		if (i.endsWith('.ico')) continue;

		const {compressedSize,uncompressedSize}=zip.files[i]._data;
		const compression= compressedSize==uncompressedSize?'STORE':'DEFLATE';
		newzip.file(i, zip.files[i].async("string") , {compression});
	}

	distFiles.forEach(f=> newzip.file(f,fs.readFileSync('dist/'+f,'utf8')));

	const newzipbuf=new Uint8Array(await newzip.generateAsync({firstFileOffset
		: zip.firstFileOffset, type:'arraybuffer'}));

	const prepend=new Uint8Array(zip.firstFileOffset);
	const filebuf=[...redbeanbuf, ...newzipbuf  ]

	fs.writeFileSync(comname,new Uint8Array(filebuf));
	console.log(comname,'created size',filebuf.length)
}
await createCleanCom();