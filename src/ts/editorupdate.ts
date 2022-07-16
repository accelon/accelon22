import {errormsg} from "./store.ts"
import {get} from "svelte/store";
import {sources,scrollY,editorToc,
  editing,editorCursor,editorClean,editingErrors,
  editorViewport,scrollToLine,getEditingSource,setEditingSource} from "./editor.ts";
import {hightLightOfftext} from "./syntaxhighlight.ts"
import {extractTag,OfftextContext} from "ptk"
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
const enumTags=(cm:CodeMirror,from:number,to:number)=>{
  const alltags=[];
  cm.doc.eachLine(from,to+1,(line,idx)=>{
  	const tags=extractTag(line.text)
  	alltags.push(...tags);
  })
  return alltags;
}

const parseFile=(cm:CodeMirror)=>{
  /*
	clearTimeout(updatetimer);
  const ctx=new OfftextContext();
	updatetimer=setTimeout(()=>{
    let i=0;
    const source=getEditingSource();
    cm.doc.eachLine( line=>{
      if (line.text.indexOf('^')>-1) {
        onAddOfftextLine.call(ctx,line.text, i,source.name );
      }
      i++;
    })
    const errors=ctx.errors;
    const toc=ctx.toc;
    setEditingSource( { ... source, toc, errors} );
    editingErrors.set(errors);
	},250);
  */
}

export const beforeChange=(cm:CodeMirror,obj)=>{
  oldtags=enumTags(cm,obj.from.line,obj.to.line);
}
export const change=(cm:CodeMirror,obj)=>{
  //no diffing, just see if need to refresh toc
  const newtags=obj?enumTags(cm,obj.from.line,obj.to.line):[]; 
  if (!obj || oldtags.length!==newtags.length) {
  	parseFile(cm);
  } else {
  	for (let i=0;i<oldtags.length;i++) {
  		if (oldtags[i].id!==newtags[i].id || oldtags[i].name!==newtags[i].name || oldtags[i].text!==newtags[i].text) {
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
  const linetext=cm.doc.getLine(line)||'';
  const char=String.fromCodePoint(linetext.codePointAt(ch)||0x0);
  editorCursor.set([line,ch,char, linetext]);
  const namedbuf=get(sources)[ get(editing) ];
  if (namedbuf) namedbuf.cursor=[line,ch];
}

export const getEditing=async (n:number)=>{
  const namedbuf=get(sources)[n];
  if (!namedbuf) return ['',0,0];

  const [line,ch]=namedbuf.cursor||[0,0];
  if (namedbuf.handle) {
      const file = await namedbuf.handle.getFile();
      const r=await file.text();
      return [r,line,ch];
  } else {
    const text=namedbuf.text;
    return [text||'',line,ch];
  }
}
let maineditor;
export const setEditingBuffer=async (handle)=>{
  const ed=get(editing);
  if (ed<0) return ;
  const buf=maineditor.getValue();
  if (!handle) {
    get(sources)[ed].text=buf;
  } else {
    const writable = await handle.createWritable();
    await writable.write(buf);
    await writable.close();
  }
  editorClean.set(true);
}

export const discardchanges=()=>{
  const n=get(editing);
  editing.set(-1);
  editing.set(n); //force clean
}
const MAXEDITABLESIZE=1024*1024*10;
let unsubscribeScrollToLine;
let unsubscribeEditing;


export const setEditor=(cm:CodeMirror)=>{

  if (!cm) {
    unsubscribeEditing();
    unsubscribeScrollToLine();
    return;
  }
  cm.on("change",(cm,obj)=>change(cm,obj));
  cm.on("cursorActivity",(cm,obj)=>cursorActivity(cm));
  cm.on("beforeChange",(cm,obj)=>beforeChange(cm,obj));
  cm.on("viewportChange",(cm,obj)=>viewportChange(cm));
  maineditor=cm;

  unsubscribeEditing=editing.subscribe(async (i)=>{
    const [buffer,line,ch]=await getEditing(i);
    const bigfile=buffer.length>MAXEDITABLESIZE;
    cm.setValue(buffer);
    cm.setCursor(line||0,ch||0);
    cm.setOption('readOnly',bigfile);
    bigfile && errormsg.set('Reaonly, 文件超过'+MAXEDITABLESIZE)
    cm.doc.markClean();
    editorClean.set(true);
    cm.doc.clearHistory();
    cm.focus();
  })
  unsubscribeScrollToLine=scrollToLine.subscribe(line=>{
      let setCursorToo=false;
      if (line==0) return;

      if (line<0) {
        line=-line;
        setCursorToo=true;
      }
      if (line>cm.doc.lastLine()) line=cm.doc.lastLine();
      cm.scrollIntoView({line}, 300);
      scrollToLine.set(0);
      setCursorToo&&cm.setCursor({line});
      !setCursorToo&&cm.focus(); 
  })
  change(cm);
}