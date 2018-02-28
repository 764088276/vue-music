/**
 * Created by HG on 2017/10/11.
 */
import * as types from './mutation_types'
import {searchHistory, deleteSearch, clearSearch, playHistory} from 'api/cache'
import Song from 'assets/js/song'

export const playSong = function ({commit, state}, {list, index}) {
  commit(types.SET_PLAY_LIST, list);
  commit(types.SET_SEQUENCE_LIST, list);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_CURRENT_INDEX, index);
  commit(types.SET_PLAYING, true);
};

//随机播放全部按钮
export const randomPlay = function ({commit, state}, {list, index}) {
  let currentIndex = state.currentIndex;
  if (currentIndex === -1) {
    commit(types.SET_CURRENT_INDEX, index);
    commit(types.SET_PLAY_LIST, list);
    commit(types.SET_FULL_SCREEN, true);
  }
  commit(types.SET_MODE, 2);
};

function findIndex(list, item, property) {
  if (!property) {
    return list.indexOf(item)
  }
  let index;
  for (let i = 0; i < list.length; i++) {
    if (list[i][property] === item[property]) {
      return i
    }
  }
  return -1
}

export const addPlaySong = function ({commit, state}, song) {
  let playList = state.playList.slice(0);
  let currentIndex = state.currentIndex;
  let index = findIndex(playList, song, 'id');
  if (index > -1) {
    currentIndex = index;
  } else {
    currentIndex = playList.length;
    playList.push(song);
  }
  commit(types.SET_PLAY_LIST, playList);
  commit(types.SET_SEQUENCE_LIST, playList);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_CURRENT_INDEX, currentIndex);
  commit(types.SET_PLAYING, true);
};

export const insertSong = function ({commit, state}, song) {
  let playList = state.playList.slice(0);
  let index = playList.findIndex((item) => {
    return item.id === song.id
  });
  if (index > -1) {
    playList.splice(index,1);
  }
  playList.push(song);
  commit(types.SET_PLAY_LIST, playList);
};

export const setHistory = function ({commit, state}, query) {
  commit(types.SET_SEARCH_HISTORY, searchHistory(query))
};
export const deleteHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
};
export const clearHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
};
//playList组件的播放设置
export const playListSongSet = function ({commit, state}, index) {
  commit(types.SET_CURRENT_INDEX, index);
  commit(types.SET_PLAYING, true);
};
//playLis组件的删除action
export const deleteSong = function ({commit, state}, index) {
  //不能单纯的将数组赋值，那只是地址的引用，用slice来复制数组
  let playList = state.playList.slice(0);
  let currentIndex = state.currentIndex;
  if (index < currentIndex) {
    currentIndex--;
  } else if (index === currentIndex) {
    if (playList.length > 1) {
      commit(types.SET_PLAYING, true);
      if(index===playList.length-1){
        currentIndex--;
      }
    } else {
      commit(types.SET_PLAYING, false);
      currentIndex = -1;
    }
  }
  playList.splice(index, 1);
  commit(types.SET_CURRENT_INDEX, currentIndex);
  commit(types.SET_PLAY_LIST, playList);
  commit(types.SET_SEQUENCE_LIST, playList);
};
export const clearPlayList = function ({commit, state}) {
  commit(types.SET_PLAY_LIST, []);
  commit(types.SET_SEQUENCE_LIST, []);
  commit(types.SET_PLAYING, false);
  commit(types.SET_FULL_SCREEN, false);
  commit(types.SET_CURRENT_INDEX, -1);
};

//playHistory 的实现
export const addPlayHistory = function ({commit, state}, song) {
  // console.log(song);
  commit(types.SET_PLAY_HISTORY, playHistory(song));
};
