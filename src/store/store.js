/**
 * Created by HG on 2017/10/11.
 */
//本页面无用，只是对vuex做了一下汇总
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);
let vueStore=new Vuex.Store({
  state:{
    singerName:''
  },
  getters:{
    singerName(state){
      return state.singerName+"s'page"
    }
  },
  actions:{
    changeUser(store,item){
      store.state.singerName=item.name;
    }
  }
});

export default vueStore
