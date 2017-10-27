<template>
  <div id="search">
    <search-box ref="searchBox" @keyword="onQueryChange"></search-box>
    <div class="hot-search" v-show="!query">
      <ul>
        <a :href="specialKey.special_url">{{specialKey.special_key}}</a>
        <li v-for="key in hotSearchList" @click="putInSearch(key.k)">{{key.k}}</li>
      </ul>
    </div>
    <suggest :query="query"></suggest>
  </div>
</template>

<script type="text/javascript">
  import searchBox from 'base/search-box/search-box'
  import {getHotSearch} from 'api/search'
  import {ERR_OK} from 'api/config'
  import suggest from 'components/suggest/suggest'

  export default{
    data(){
      return {
        hotSearchList: [],
        specialKey: {},
        query:''
      }
    },
    created(){
      this._getHotSearch()
    },
    methods: {
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
        this.query=val;
      }
    },
    components: {
      searchBox,
      suggest
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
