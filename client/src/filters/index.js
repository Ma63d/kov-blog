/**
 * Created by chuck7 on 16/9/20.
 */
import marked from 'marked'
import highlight from 'highlight.js/lib/highlight'
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
export function markdown(str){
  let result  = marked(str);
  return result;
}
