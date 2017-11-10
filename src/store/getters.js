/**
 * Created by HG on 2017/10/11.
 */
export const singer = state => state.singer;
export const fullScreen = state => state.fullScreen;
export const playList = state => state.playList;
export const sequenceList = state => state.sequenceList;
export const mode = state => state.mode;
export const currentIndex = state => state.currentIndex;
export const currentSong = state => state.playList[state.currentIndex] || {};
export const playing = state => state.playing;
export const disc = state => state.disc;
export const rankList = state => state.rankList;
export const searchHistory = state => state.searchHistory;
export const playHistory = state => state.playHistory;
