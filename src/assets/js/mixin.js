/**
 * Created by HG on 2017/10/25.
 */
import {mapGetters} from 'vuex'


/*mixin相当于对不同功能组件中相同功能的模块进行了一次封装，
* 引用mixin相当于对组件中的内容进行了一次expand，组件中的方法会替换mixin中的方法
* 相同的钩子函数则会合并成为一个组件，且mixin中钩子的触发顺序在前*/
export const playListMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted(){
    this.handlerPlayList()
  },
  activated(){
    this.handlerPlayList()
  },
  watch: {
    playList(newVal){
      handlerPlayList(newVal)
    }
  },
  methods: {
    handlerPlayList(){
      throw new Error('method handlerPlayList must be implemented')
    }
  }
};
