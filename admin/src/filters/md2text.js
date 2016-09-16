/**
 * Created by chuck7 on 16/9/16.
 */
import marked from 'marked';
export default function(markdown){
  let div = document.createElement('div');
  div.innerHTML = marked.parse(markdown);
  return trim(div.innerText);
}
function trim(text){
  return text.replace(/(^\s*)|(\s*$)/g, "");
}
