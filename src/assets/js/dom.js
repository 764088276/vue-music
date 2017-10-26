/**
 * Created by HG on 2017/10/13.
 */
let box=document.createElement('div').style;

let vendor=(()=>{
  let transformName={
    webkit:'webkitTransform',
    Moz:'MozTransform',
    O:'OTransform',
    ms:'msTransform',
    standard:'transform'
  };
  for(let key in transformName){
    if(box[transformName[key]]!=='undefined'){
      return key
    }
  }
  return false
})();

export default function cssProfix(style){
  if(vendor===false){
    return false
  }
  if(vendor==='standard'){
    return style
  }else{
    return vendor+style.charAt(0).toUpperCase()+style.substring(1)
  }
}
