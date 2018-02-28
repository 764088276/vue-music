/**
 * Created by HG on 2017/10/11.
 */
import {getSongLyric} from 'api/song'
import {Base64} from 'js-base64'
import {ERR_OK} from 'api/config'
import {getSongVkey} from 'api/song'

export default class Song {
  constructor({id, mid, name, singer, album, interval, image}) {
    this.id = id;
    this.mid = mid;
    this.name = name;
    this.singer = singer;
    this.album = album;
    this.interval = interval;
    this.image = image;
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric);
    }
    return new Promise((resolve, reject) => {
      getSongLyric(this.mid).then(res => {
        if (res.data.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.data.lyric);
          resolve(this.lyric)
        } else {
          reject('a')
        }
      })
    })
  }
}

export function createSong(musicData) {

  let song=new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    name: musicData.songname,
    singer: filterSinger(musicData.singer),
    album: musicData.albumname,
    interval: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`
  });
  // getSongVkey(musicData.songmid).then(function (res) {
  //   let data = res.data.items[0];
  //   let vkey = data.vkey;
  //   let filename = data.filename;
  //   song.url=`https://dl.stream.qqmusic.qq.com/${filename}?vkey=${vkey}&guid=3483791342&uin=764088276&fromtag=66`
  // });
  return song
}


export function filterSinger(singer) {
  let ret = [];
  if (singer.length > 0) {
    singer.forEach((singer) => {
      ret.push(singer.name)
    })
  }
  return ret.join('/')
}
