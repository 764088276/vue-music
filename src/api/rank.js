/**
 * Created by HG on 2017/10/26.
 */
import jsonp from 'assets/js/jsonp'
import {commonParams} from './config'

export function getRankList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
  let data = Object.assign({}, commonParams, {
    g_tk: 5381,
    format: 'jsonp',
    notice: '0',
    platform: 'h5',
    needNewCode: 1,
    uin: '0'
  });
  return jsonp(url, data,{
    param:'jsonpCallback'
  })
}

export function getRankDetail(id){
  const url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
  let data=Object.assign({},commonParams,{
    g_tk:5381,
    uin:0,
    format:'json',
    platform:'h5',
    needNewCode:1,
    tpl:3,
    page:'detail',
    type:'top',
    topid:id
  });
  return jsonp(url,data,{
    param:'jsonpCallback'
  })
}
