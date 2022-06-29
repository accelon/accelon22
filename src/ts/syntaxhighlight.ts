import {OFFTAG_REGEX_G} from 'ptk/offtext/constants.ts'
export const hightLightOfftext=(doc)=>{
  doc.cm.startOperation();
  const {from,to}=doc.cm.getViewport();
  const marks=doc.findMarks({line:from},{line:to})
  marks.forEach(it=>it.clear());
  let extra=0,j;
  for (let i=from;i<to;i++){
  	  const line=doc.getLine(i)
  	  line.replace(OFFTAG_REGEX_G,(m,m1,m2,idx)=>{
        doc.markText({line:i,ch:idx},{line:i,ch:idx+m.length},{className:'offtag'});
  	  })
  }
  doc.cm.endOperation();
}