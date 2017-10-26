/**
 * Created by HG on 2017/9/20.
 */
import Vue from 'Vue';
import jsonp from '../assets/js/jsonp'
import {commonParams} from './config.js';
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  let data = Object.assign({}, commonParams, {
    uin: 0,
    g_tk: 5391,
    platform: 'h5',
    format: 'json',
    needNewCode: 1
  });
  return jsonp(url, data,{
    param:'jsonpCallback'
  })
}

export function getDiskList() {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
  let data = Object.assign({}, commonParams, {
    needNewCode: '0',
    g_tk: 1340277798,
    format: 'jsonp',
    platform: 'yqq',
    hostUin:'0',
    loginUin:'0',
    data:'{"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"QQMusic.MusichallServer","method":"GetNewSong","param":{"type":0}},"new_album":{"module":"QQMusic.MusichallServer","method":"GetNewAlbum","param":{"type":0,"category":"-1","genre":0,"year":1,"company":-1,"sort":1,"start":0,"end":39}},"toplist":{"module":"music.web_toplist_svr","method":"get_toplist_index","param":{}},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}}'
  });
  return jsonp(url,data, {
    param:'callback',
    name:'recom49850004666940984'
  })
}

export function getDiskSongList(disstid){
    const url='/api/getDissList';
    let data=Object.assign({},commonParams,{
      type:1,
      json:1,
      utf8:1,
      onlysong:1,
      disstid,
      format:'json',
      g_tk:5381,
      platform:'yqq',
      needNewCode:0
    });
    return axios.get(url,{
      params:data
    }).then((res)=>{
      return Promise.resolve(res)
    }
  )
}
