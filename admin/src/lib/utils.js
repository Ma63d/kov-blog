/**
 * Created by chuck7 on 16/9/7.
 */
const languages = ['1c','abnf','accesslog','actionscript','ada','apache','applescript','cpp','arduino','armasm','xml','asciidoc','aspectj','autohotkey','autoit','avrasm','awk','axapta','bash','basic','bnf','brainfuck','cal','capnproto','ceylon','clojure','clojure-repl','cmake','coffeescript','coq','cos','crmsh','crystal','cs','csp','css','d','markdown','dart','delphi','diff','django','dns','dockerfile','dos','dsconfig','dts','dust','ebnf','elixir','elm','ruby','erb','erlang-repl','erlang','excel','fix','fortran','fsharp','gams','gauss','gcode','gherkin','glsl','go','golo','gradle','groovy','haml','handlebars','haskell','haxe','hsp','htmlbars','http','inform7','ini','irpf90','java','javascript','json','julia','kotlin','lasso','ldif','less','lisp','livecodeserver','livescript','lsl','lua','makefile','mathematica','matlab','maxima','mel','mercury','mipsasm','mizar','perl','mojolicious','monkey','moonscript','nginx','nimrod','nix','nsis','objectivec','ocaml','openscad','oxygene','parser3','pf','php','pony','powershell','processing','profile','prolog','protobuf','puppet','purebasic','python','q','qml','r','rib','roboconf','rsl','ruleslanguage','rust','scala','scheme','scilab','scss','smali','smalltalk','sml','sqf','sql','stan','stata','step21','stylus','subunit','swift','taggerscript','yaml','tap','tcl','tex','thrift','tp','twig','typescript','vala','vbnet','vbscript','vbscript-html','verilog','vhdl','vim','x86asm','xl','xquery','zephir'];
import highlight from 'highlight.js'
import marked from 'marked';
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
