<template>
  <div class="suggest-list">
    <h2 class="title">
      <span>{{title}}</span>
      <i class="iconfont icon-shanchu" @click="clear"></i>
    </h2>
    <scroll class="list-wrapper" :data="suggestList">
      <ul class="list">
        <li v-for="(item,index) in suggestList" @click="selectItem(item)">
          <span>{{item}}</span>
          <i class="iconfont icon-chuyidong" @click.stop="remove(item)"></i>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script type="text/javascript">
  import {mapGetters} from 'vuex'
  import scroll from 'base/scroll/scroll'
  import {searchHistory, deleteSearch, clearSearch} from 'api/cache'
  import {mapMutations} from 'vuex'

  export default{
    props: {
      listType: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: 'title'
      },
      addMore: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters([
        'searchHistory'
      ])
    },
    created(){
      this.setList()
    },
    data(){
      return {
        suggestList: []
      }
    },
    methods: {
      ...mapMutations({
        'setSearchHistory': 'SET_SEARCH_HISTORY'
      }),
      setList() {
          this.suggestList.splice(0);
          this.searchHistory.forEach((name) => {
            this.suggestList.push(name)
          })
      },
      selectItem(item){
        this.$emit('selectHistory', item);
      },
      remove(item){
        this.$emit('remove',item)
      },
      clear(){
        this.$emit('clear')
      }
    },
    watch: {
      searchHistory()
      {
        this.setList()
      }
    }
    ,
    components: {
      scroll
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/variable';

  .suggest-list {
    width: 100%;
    background: @color-background-d;
    /*padding-bottom: 10px;*/
    position: absolute;
    bottom: 60px;
    top: 320px;
    .title {
      width: 100%;
      line-height: 30px;
      background: @color-highlight-background;
      padding: 0 10px;
      box-sizing: border-box;
      color: @color-theme-d;
      font-size: 14px;
      .icon-shanchu {
        float: right;
        font-size: 20px;
      }
    }
    .list-wrapper {
      position: absolute;
      top: 30px;
      bottom: 0;
      width: 100%;
      overflow: hidden;
    }
    .list {
      padding: 5px 10px;
      box-sizing: border-box;
      color: @color-sub-theme;
      font-size: 14px;
      line-height: 26px;
      .icon-chuyidong {
        float: right;
        font-size: 20px;
      }
    }
  }
</style>
