/**
 * Created by HG on 2017/9/20.
 */
import originJSONP from "jsonp"

export default function jsonp(url, data, opts) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + params(data);
  return new Promise(function (resolve, reject) {
    originJSONP(url, opts, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err)
      }
    })
  })
}
/*拼接参数的函数*/
function params(data) {
  let url = "";
  for (var i in data) {
    let dataParam = data[i] || "";
    url += `&${i}=${encodeURIComponent(dataParam)}`;
  }
  return url.substring(1) || ""
}
