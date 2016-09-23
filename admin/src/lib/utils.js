/**
 * Created by chuck7 on 16/9/7.
 */
import highlight from 'highlight.js'
import marked from 'marked';
const languages = ["cpp", "xml", "bash", "coffeescript", "css", "markdown", "http", "java", "javascript", "json", "less", "makefile", "nginx", "php", "python", "scss", "sql", "stylus"];
highlight.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'));
highlight.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
highlight.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
highlight.registerLanguage('coffeescript', require('highlight.js/lib/languages/coffeescript'));
highlight.registerLanguage('css', require('highlight.js/lib/languages/css'));
highlight.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'));
highlight.registerLanguage('http', require('highlight.js/lib/languages/http'));
highlight.registerLanguage('java', require('highlight.js/lib/languages/java'));
highlight.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
highlight.registerLanguage('json', require('highlight.js/lib/languages/json'));
highlight.registerLanguage('less', require('highlight.js/lib/languages/less'));
highlight.registerLanguage('makefile', require('highlight.js/lib/languages/makefile'));
highlight.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'));
highlight.registerLanguage('php', require('highlight.js/lib/languages/php'));
highlight.registerLanguage('python', require('highlight.js/lib/languages/python'));
highlight.registerLanguage('scss', require('highlight.js/lib/languages/scss'));
highlight.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
highlight.registerLanguage('stylus', require('highlight.js/lib/languages/stylus'));
highlight.configure({
  classPrefix: ''     // don't append class prefix
})
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  highlight: function (code,lang) {
    if(!~languages.indexOf(lang)){
      return highlight.highlightAuto(code).value;
    }
    return highlight.highlight(lang,code).value;
  }
});
export {
  marked
}

/**
 * 从url中获取指定的param
 */
export function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
/**
 * 一些场景下不能用vue的debounce
 * 自己实现的一个函数防抖
 * 函数传参同underscore的debounce,
 * 练练手,以后面试可能会问 - -
 */
export function _debounce(func,wait,immediate = false){
  let _timestamp, _timer;
  if(immediate !== true){
    return function(){
      let now = Date.now();
      if(_timestamp && ((now - _timestamp) < wait)){
        clearTimeout(_timer);
      }
      _timestamp = now;
      _timer = setTimeout(func.bind(this,...arguments),wait)
    }
  }else{
    return function(){
      let now = Date.now();
      if(_timestamp && ((now - _timestamp) < wait)){
        _timestamp = now;
        return;
      }
      _timestamp = now;
      func.apply(this,arguments)
    }
  }
}
export function trim(text){
  return text.replace(/(^\s*)|(\s*$)/g, "");
}
