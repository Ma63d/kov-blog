/**
 * Created by chuck7 on 16/9/7.
 */
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
