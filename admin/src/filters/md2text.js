/**
 * Created by chuck7 on 16/9/16.
 */
import marked from 'marked';
import {trim} from '../lib/utils'
export default function(markdown){
  let div = document.createElement('div');
  div.innerHTML = marked.parse(markdown);
  return trim(div.innerText);
}

