/**
 * Created by HG on 2017/10/11.
 */
import * as types from './mutation_types'

export const playSong = function ({commit, state}, {list, index}) {
  commit(types.SET_PLAY_LIST, list);
  commit(types.SET_SEQUENCE_LIST, list);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_CURRENT_INDEX, index);
  commit(types.SET_PLAYING, true);
};
