import {extractTocTag} from 'ptk/offtext/parser.ts'
import {editingtoc,getEditingBuffer,editing,scrollY} from './store.ts'
import {hightLightOfftext} from './syntaxhighlight.ts'
import {scrollToLine} from './store.js'
let oldtags=[];
let timer,updatetimer;
export const viewportChange=(cm:CodeMirror)=>{
  clearTimeout(timer);
  timer=setTimeout(()=>{
    const {from,to}=cm.getViewport();
    scrollY.set(from);
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
		const toc= tags.map((it,idx)=>{return {text:it.text,key:idx, line:it.line}});
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
  viewportChange(cm);
}

export const setEditor=(cm:CodeMirror)=>{
  cm.on("change",(cm,obj)=>change(cm,obj));
  cm.on("beforeChange",(cm,obj)=>beforeChange(cm,obj));
  cm.on("viewportChange",(cm,obj)=>viewportChange(cm));


  scrollToLine.subscribe(line=>{
  	if (line>-1) {
	  cm.scrollIntoView({line}, 300);
	  cm.scrollTo(0);
	  scrollToLine.set(-1);
  	}
  })
  editing.subscribe(i=>cm.setValue(getEditingBuffer(i)))
  change(cm)
}