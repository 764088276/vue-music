/**
 * Created by HG on 2017/10/31.
 */
const SEARCH_KEY = '__search__';
const SEARCH_MAX_LEN = 8;
const PLAY_KEY = '__play__';
const PLAY_MAX_LEN = 20;

const storage = {
  set(key, value){
    let normalizeValue = JSON.stringify(value);
    localStorage.setItem(key, normalizeValue);
  },
  get(key){
    let ct = localStorage.getItem(key);
    if (!ct) {
      return []
    }
    return JSON.parse(ct)
  },
  removeItem(key){
    localStorage.removeItem(key)
  },
  clear(){
    localStorage.clear()
  },
  has(key, value){
    let ct = this.get(key);
    let index = ct.indexOf(value);
    return index
  }
};

function findIndex(list, fn) {
  if (list.length) {
    return false
  }
  let index = list.findIndex(fn);
  return index
}
//search的储存

export function searchHistory(query) {
  let history = storage.get(SEARCH_KEY);
  if (query) {
    let index = storage.has(SEARCH_KEY, query);
    if (index > -1) {
      history.splice(index, 1);
    } else if (history.length >= SEARCH_MAX_LEN) {
      history.pop();
    }
    history.unshift(query);
  }
  storage.set(SEARCH_KEY, history);
  return history
}

export function deleteSearch(query) {
  let history = storage.get(SEARCH_KEY);
  let index = storage.has(SEARCH_KEY, query);
  if (index > -1) {
    history.splice(index, 1);
  }
  storage.set(SEARCH_KEY, history);
  return history
}

export function clearSearch() {
  storage.removeItem(SEARCH_KEY);
  return []
}

//play的储存
export function playHistory(song) {
  let songs = storage.get(PLAY_KEY);
  if (song) {
    let index = songs.findIndex((item) => {
      return item.id == song.id
    });
    if (index > -1) {
      songs.splice(index, 1);
    } else if (songs.length >= PLAY_MAX_LEN) {
      songs.pop();
    }
    songs.unshift(song)
  }
  storage.set(PLAY_KEY, songs);
  return songs
}
