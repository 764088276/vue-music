<template>
  <div id="search" @touchstart="searchBlur">
    <search-box ref="searchBox" @keyword="onQueryChange"></search-box>
    <div class="hot-search" v-show="!query">
      <ul>
        <a :href="specialKey.special_url">{{specialKey.special_key}}</a>
        <li v-for="key in hotSearchList" @click="putInSearch(key.k)">{{key.k}}</li>
      </ul>
    </div>

    <search-list
      listType="search"
      title="历史搜索记录"
      v-show="!query&&searchHistory.length"
      @selectHistory="historyQuery"
      @remove="deleteHistory"
      @clear="_clearHistory"
    >
    </search-list>
    <suggest :query="query" @selected="saveHistory" ref="suggest"></suggest>
    <confirm
      text="确定要清空搜索历史记录吗"
      @sure="deleteConfirm"
      @cancel="deleteCancel"
      ref="confirm"
    ></confirm>
  </div>
</template>

<script type="text/javascript">
  import searchBox from 'base/search-box/search-box'
  import {getHotSearch} from 'api/search'
  import {ERR_OK} from 'api/config'
  import suggest from 'components/suggest/suggest'
  import {mapActions, mapGetters} from 'vuex'
  import searchList from 'base/searchList/searchList'
  import confirm from 'base/confirm/confirm'

  export default{
    data(){
      return {
        hotSearchList: [],
        specialKey: {},
        query: ''
      }
    },
    created(){
      this._getHotSearch();
    },
    computed: {
      ...mapGetters([
        'searchHistory'
      ])
    },
    methods: {
      ...mapActions([
        'setHistory',
        'deleteHistory',
        'clearHistory'
      ]),
      _clearHistory(){
          this.$refs.confirm.showConfirmCt();
      },
      deleteConfirm(){
        this.clearHistory()
      },
      deleteCancel(){},
      _getHotSearch(){
        getHotSearch().then(res => {
          if (res.code === ERR_OK) {
            this.hotSearchList = res.data.hotkey.slice(1, 10);
            if (res.data.special_key) {
              this.specialKey = {
                special_key: res.data.special_key,
                special_url: res.data.special_url
              }
            }
          }
        })
      },
      putInSearch(item){
        this.$refs.searchBox.getKeyWord(item);
      },
      onQueryChange(val){
        this.query = val;
      },
      searchBlur(){
        this.$refs.searchBox.blur()
      },
      saveHistory(){
        this.setHistory(this.query)
      },
      historyQuery(item){
        this.$refs.searchBox.getKeyWord(item)
      }
    },
    components: {
      searchBox,
      suggest,
      searchList,
      confirm
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/variable';

  .hot-search {
    width: 100%;
    padding: 10px 5px;
    font-size: 14px;
    box-sizing: border-box;
    ul {
      overflow: auto;
    }
    a, li {
      padding: 6px;
      float: left;
      text-decoration: none;
      color: @color-dialog-background;
      background: @color-highlight-background;
      margin: 5px;
      border-radius: 6px;
    }
    a {
      color: @color-theme-d;
    }
  }
</style>
