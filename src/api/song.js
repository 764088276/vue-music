/**
 * Created by HG on 2017/10/20.
 */
// import jsonp from 'assets/js/jsonp'
import {commonParams} from './config'
import axios from 'axios'
import jsonp from 'assets/js/jsonp.js'

export function getSongLyric(mid) {
  let url = '/api/getLyricData';
  let data = Object.assign({}, commonParams, {
    songmid: mid,
    g_tk: '5381',
    format: 'json',
    platform: 'yqq',
    pcachetime: +new Date(),
    needNewCode: '0'
  });
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res)
  })
}

export function getSongVkey(mid) {
  let url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';
  let data = Object.assign({}, commonParams, {
    g_tk: 1905297579,
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    songmid: mid,
    filename: `C400${mid}.m4a`,
    guid: 3483791342,
    loginUin:764088276,
    uin:764088276
  });
  return jsonp(url, data)
}
