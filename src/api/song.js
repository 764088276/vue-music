/**
 * Created by HG on 2017/10/20.
 */
// import jsonp from 'assets/js/jsonp'
import {commonParams} from './config'
import axios from 'axios'

export function getSongLyric(mid) {
  let url = '/api/getLyricData';
  let data = Object.assign({}, commonParams, {
    songmid: mid,
    g_tk: '5381',
    format: 'json',
    platform: 'yqq',
    pcachetime:+new Date(),
    needNewCode: '0'
  });
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res)
  })
}
