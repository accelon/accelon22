import {extractTocTag} from 'ptk/offtext/parser.ts'
import {errormsg} from './store.ts'
import {get} from "svelte/store";
import {sources,scrollY,editingtoc,editing,editorCursor,editorClean,editorViewport,scrollToLine} from './editor.ts';
import {hightLightOfftext} from './syntaxhighlight.ts'
let oldtags=[];
let timer,updatetimer;
export const viewportChange=(cm:CodeMirror)=>{
  clearTimeout(timer);
  timer=setTimeout(()=>{
    const {from,to}=cm.getViewport();
    scrollY.set(from);
    editorViewport.set([from,to]);
    hightLightOfftext(cm.doc);
  },250);
}
const extractTags=(cm:CodeMirror,from:number,to:number)=>{
  const alltags=[];
  cm.doc.eachLine(from,to+1,(line)=>{
  	const tags=extractTocTag(line.text)
  	alltags.push(...tags);
  })
  return alltags;
}
const parseFile=(cm:CodeMirror)=>{
	clearTimeout(updatetimer);
	updatetimer=setTimeout(()=>{
		const tags = extractTocTag(cm.doc.getValue());
		const toc= tags.map((it,idx)=>{
      const depth=parseInt(it.name.slice(1,2),36)-10;
      return {depth,text:it.text,key:idx, line:it.line}
    });
		editingtoc.set(toc);
	},250);
}
export const beforeChange=(cm:CodeMirror,obj)=>{
  oldtags=extractTags(cm,obj.from.line,obj.to.line);
}
export const change=(cm:CodeMirror,obj)=>{
  //no diffing, just see if need to refresh toc
  const newtags=obj?extractTags(cm,obj.from.line,obj.to.line):[]; 
  if (!obj || oldtags.length!==newtags.length) {
  	parseFile(cm);
  } else {
  	for (let i=0;i<oldtags.length;i++) {
  		if (oldtags[i].text!==newtags[i].text) {
  			parseFile(cm);
  			break;
  		}
  	}
  }
  editorClean.set(cm.doc.isClean());
  viewportChange(cm);
}

const cursorActivity=(cm:CodeMirror)=>{
  const {line,ch}= cm.doc.getCursor();
  const char=String.fromCodePoint((cm.doc.getLine(line)||'').codePointAt(ch)||0x0);
  editorCursor.set([line,ch,char]);
}

export const getEditingBuffer=async (n:number)=>{
  const namedbuf=get(sources)[n];
  if (!namedbuf) return '';
  if (namedbuf.handle) {
      const file = await namedbuf.handle.getFile();
      return await file.text();
  } else {
    const text=namedbuf.text;
    return text||'';
  }
}
let maineditor;
export const setEditingBuffer=async (handle)=>{
  // const _sources= get(sources);
  // _sources[ get(editing) ].text = buf;
  // sources.set(_sources);
  const buf=maineditor.getValue();
  const writable = await handle.createWritable();
  await writable.write(buf);
  await writable.close();
  editorClean.set(true);
}

export const discardchanges=()=>{
  const n=get(editing);
  editing.set(-1);
  editing.set(n); //force clean
}

export const setEditor=(cm:CodeMirror)=>{
  cm.on("change",(cm,obj)=>change(cm,obj));
  cm.on("cursorActivity",(cm,obj)=>cursorActivity(cm));
  cm.on("beforeChange",(cm,obj)=>beforeChange(cm,obj));
  cm.on("viewportChange",(cm,obj)=>viewportChange(cm));
  maineditor=cm;

  editing.subscribe(async (i)=>{
    cm.setValue(await getEditingBuffer(i))
    cm.doc.markClean();
    editorClean.set(true);
    cm.doc.clearHistory();
  })
  scrollToLine.subscribe(line=>{
      let setCursorToo=false;
      if (line==0) return;

      if (line<0) {
        line=-line;
        setCursorToo=true;
      }
      if (line>cm.doc.lastLine()) line=cm.doc.lastLine();
      cm.scrollIntoView({line}, 300);
      //cm.scrollTo(0);
      scrollToLine.set(0);
      setCursorToo&&cm.setCursor({line});
      !setCursorToo&&cm.focus(); 
  })
  change(cm);
}