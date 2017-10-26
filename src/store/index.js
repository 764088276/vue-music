/**
 * Created by HG on 2017/10/11.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters'
import * as actions from './actions'
import state from './state'
import mutations from './mutations'
//createLogger是一种vuex插件，state数据通过mutations发生变化时，会在控制台生成一条日志
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);
//debug是用来检测state中的数据修改是不是通过mutations来修改的，如果是直接进行修改的，会警告。但是在线上环境运行时，会产生性能的损耗，因此会做一个判断，只有在线下的时候才为true才会运行。因此debug只是用来检测运行环境是线上还是线下
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
