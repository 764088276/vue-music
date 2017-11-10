/**
 * Created by HG on 2017/10/11.
 */
import jsonp from 'assets/js/jsonp'
import {commonParams} from './config'

export function getSingerDetail(singer) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
  let data = Object.assign({}, commonParams, {
    g_tk: 5381,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: '0',
    order: 'listen',
    begin: '0',
    num: '30',
    songstatus: '1',
    singermid: singer.mid
  });
  return jsonp(url, data, {
    param: 'jsonpCallback'
  })
}

export function getAlbumDetail(albummid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg';
  let data = Object.assign({}, commonParams, {
    albummid: albummid,
    g_tk: 5381,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: 0
  });
  return jsonp(url, data, {
    param: 'jsonpCallback'
  })
}
