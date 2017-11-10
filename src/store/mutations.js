
import * as types from "./mutation_types"

const mutations = {
  [types.SET_SINGER](state, singer){
    state.singer = singer
  },
  [types.SET_PLAYING](state, param){
    state.playing = param
  },
  [types.SET_FULL_SCREEN](state, param){
    state.fullScreen = param
  },
  [types.SET_PLAY_LIST](state, param){
    state.playList = param
  },
  [types.SET_SEQUENCE_LIST](state, param){
    state.sequenceList = param
  },
  [types.SET_MODE](state, param){
    state.mode = param;
  },
  [types.SET_CURRENT_INDEX](state, param){
    state.currentIndex = param;
  },
  [types.SET_DISC](state, param){
    state.disc = param;
  },
  [types.SET_RANK_LIST](state, param){
    state.rankList = param;
  },
  [types.SET_SEARCH_HISTORY](state, param){
    state.searchHistory = param;
  },
  [types.SET_PLAY_HISTORY](state, param){
    state.playHistory = param
  }
};
export default mutations
