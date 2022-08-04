import {errormsg} from "./store.ts"
import {get} from "svelte/store";
import ErrorLineWidget from "../errorlinewidget.svelte"
import {sources,scrollY,editorToc,compileErrors,
  editing,editingFilename,editorCursor,editorClean,editingErrors,getEditing,
  editorViewport,scrollToLine,setEditingSource} from "./editor.ts";
import {hightLightOfftext} from "./syntaxhighlight.ts"
import {Offtext,OfftextContext,Compiler} from "ptk"
let oldtags=[];
let timer,updatetimer;
export const compiler=new Compiler();
export const viewportChange=(cm:CodeMirror)=>{
  clearTimeout(timer);
  timer=setTimeout(()=>{
    const {from,to}=cm.getViewport();
    scrollY.set(from);
    editorViewport.set([from,to]);
    hightLightOfftext(cm.doc);
  },50);
}
const enumTags=(cm:CodeMirror,from:number,to:number)=>{
  const alltags=[];
  cm.doc.eachLine(from,to+1,(line,idx)=>{
    const offtext=new Offtext(line.text);
  	alltags.push(...offtext.tags);
  })
  return alltags;
}

const parseFile=(cm:CodeMirror)=>{
  console.log('parse file')
}

export const beforeChange=(cm:CodeMirror,obj)=>{
  oldtags=enumTags(cm,obj.from.line,obj.to.line);
}
export const change=(cm:CodeMirror,obj)=>{
  if (!cm.doc.isClean()) {
    const namedbuf=get(sources)[ get(editing) ];
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
let unsubscribeCompileErrors;

export const setCompileErrors=(newerrors)=>{
    if (typeof newerrors=='undefined') {
      newerrors=compiler.compiledFiles[editingFilename()]?.errors || [];
    }
    get(compileErrors).forEach(error=>error.widget?.clear());
    compileErrors.set(newerrors);
}
export const setEditor=(cm:CodeMirror)=>{
  if (!cm) {
    unsubscribeEditing();
    unsubscribeScrollToLine();
    unsubscribeCompileErrors();
    return;
  }
  cm.on("change",(cm,obj)=>change(cm,obj));
  cm.on("cursorActivity",(cm,obj)=>cursorActivity(cm));
  cm.on("beforeChange",(cm,obj)=>beforeChange(cm,obj));
  cm.on("viewportChange",(cm,obj)=>viewportChange(cm));
  maineditor=cm;

  unsubscribeEditing=editing.subscribe(async (i)=>{
    const e=await getEditing(i);
    if (!e)return;
    const bigfile=e.text.length>MAXEDITABLESIZE;
    cm.setValue(e.text);
    cm.setCursor(e.state.line||0,e.state.ch||0);
    cm.setOption('readOnly',bigfile);
    bigfile && errormsg.set('Reaonly, 文件超过'+MAXEDITABLESIZE)
    cm.doc.markClean();
    editorClean.set(true);
    cm.doc.clearHistory();
    setCompileErrors(compiler.compiledFiles[e.name]?.errors)
    cm.focus();
  })
  unsubscribeCompileErrors=compileErrors.subscribe( errors=>{
      for (let i=0;i<errors.length;i++) {
        const error=errors[i];
        const target=document.createElement('span');
        const linewidget=new ErrorLineWidget({target,props:error});
        error.widget= cm.addLineWidget(error.line+2,target);
      }
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