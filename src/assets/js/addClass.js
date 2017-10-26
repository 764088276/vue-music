/**
 * Created by HG on 2017/9/21.
 */
export function addClass(el,className){
  if(hasClass(el,className)){
    return false
  }else{
    let cln=el.className.split(" ");
    cln.push(className);
    el.className=cln.join(' ');
  }
}

function hasClass(el,className){
  let reg=new RegExp('(^|\\s)'+className+'(\\s|$)');
  return reg.test(el.className)
}
