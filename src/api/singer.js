import jsonp from '../assets/js/jsonp.js';
import {commonParams} from './config.js'

export function getSingerList(){
  let url='https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  let data=Object.assign({},commonParams,{
    platform:'yqq',
    format:'jsonp',
    page:'list',
    needNewCode:0,
    g_tk:1340277798,
    channel:'singer',
    pagesize:100,
    pagenum:1,
    key:'all_all_all'
  });
  return jsonp(url,data,{
    param:'jsonpCallback'
  })
}

