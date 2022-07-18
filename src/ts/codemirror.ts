import { loadScript } from "ptk/utils/loadscript.ts";
import {CMActiveLine} from '../3rdparty/activeline.js'

export const loadCodeMirror=async ()=>{
  if (typeof CodeMirror=='undefined') {
    Promise.all([loadScript('codemirror.css'),loadScript('ambiance.css'),loadScript('codemirror.js')])
    CMActiveLine();
  } else {
    await loadScript('codemirror.css')
  }
}