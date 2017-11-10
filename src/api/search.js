/**
 * Created by HG on 2017/10/27.
 */
import jsonp from 'assets/js/jsonp'
import {commonParams} from './config'

export function getHotSearch() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
  let data = Object.assign({}, commonParams, {
    g_tk: 5381,
    needNewCode: 1,
    platform: 'h5',
    format: 'json'
  });
  return jsonp(url, data, {
    param: 'jsonpCallback'
  })
}

export function getSuggestData(keyword, page, zhida, perpage) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
  let data = Object.assign({}, commonParams, {
    g_tk: 5381,
    format: 'jsonp',
    platform: 'h5',
    needNewCode: 1,
    w: keyword,
    zhidaqu: 1,
    catZhida: zhida,
    t: '0',
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: '0',
    perpage,
    n: perpage,
    p: page,
    remoteplace: 'txt.mqq.all'
  });

  return jsonp(url, data, {
    param: 'jsonpCallback'
  })
}
