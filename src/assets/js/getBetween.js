/**
 * Created by HG on 2017/9/30.
 */
export default function getBetween(num,min,max){
  if(num<min){
    return min
  }else if(num>max){
    return max
  }else{
    return num
  }
}
