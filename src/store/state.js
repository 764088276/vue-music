/**
 * Created by HG on 2017/10/11.
 */
import {play_mode} from 'assets/js/config'

//state中主要保存传递的数据
const state={
  singer:{},
  playing:false,
  fullScreen:false,
  playList:[],
  sequenceList:[],
  mode:play_mode.sequence,
  currentIndex:-1,
  disc:{}
};
export default state
