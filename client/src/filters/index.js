/**
 * Created by chuck7 on 16/9/20.
 */
import marked from 'marked'
import highlight from 'highlight.js'
const languages = ['1c','abnf','accesslog','actionscript','ada','apache','applescript','cpp','arduino','armasm','xml','asciidoc','aspectj','autohotkey','autoit','avrasm','awk','axapta','bash','basic','bnf','brainfuck','cal','capnproto','ceylon','clojure','clojure-repl','cmake','coffeescript','coq','cos','crmsh','crystal','cs','csp','css','d','markdown','dart','delphi','diff','django','dns','dockerfile','dos','dsconfig','dts','dust','ebnf','elixir','elm','ruby','erb','erlang-repl','erlang','excel','fix','fortran','fsharp','gams','gauss','gcode','gherkin','glsl','go','golo','gradle','groovy','haml','handlebars','haskell','haxe','hsp','htmlbars','http','inform7','ini','irpf90','java','javascript','json','julia','kotlin','lasso','ldif','less','lisp','livecodeserver','livescript','lsl','lua','makefile','mathematica','matlab','maxima','mel','mercury','mipsasm','mizar','perl','mojolicious','monkey','moonscript','nginx','nimrod','nix','nsis','objectivec','ocaml','openscad','oxygene','parser3','pf','php','pony','powershell','processing','profile','prolog','protobuf','puppet','purebasic','python','q','qml','r','rib','roboconf','rsl','ruleslanguage','rust','scala','scheme','scilab','scss','smali','smalltalk','sml','sqf','sql','stan','stata','step21','stylus','subunit','swift','taggerscript','yaml','tap','tcl','tex','thrift','tp','twig','typescript','vala','vbnet','vbscript','vbscript-html','verilog','vhdl','vim','x86asm','xl','xquery','zephir'];
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
