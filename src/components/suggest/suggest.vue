<template>
  <div class="suggest-list" v-show="suggestList">
    <ul>
      <li v-for="(item,index) in suggestList" class="suggest-item">
        <i class="iconfont" :class="showzhida(item)"></i>
        <div class="song-msg">
          <span class="song-name">{{item.songname}}</span>
          <span class="song-name">{{item.singername}}</span><br>
          <span class="singer-name">{{getSinger(item.singer)}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
  import {getSuggestData} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {filterSinger} from 'assets/js/song'

  export default{
    props: {
      query: {
        type: String,
        default: ''
      },
      page: {
        type: Number,
        default: 1
      }
    },
    data(){
      return {
        suggestList: []
      }
    },
    computed: {

    },
    created(){
      this.$watch('query', (newVal) => {
        this._getSuggestData(newVal, this.page)
      })
    },
    methods: {
      _getSuggestData(){
        getSuggestData(this.query, this.page).then(res => {
          if (res.code === ERR_OK) {
            let ret = [];
            if (res.data.zhida.type !== 0) {
              ret.push({...res.data.zhida, zhida: 'singer'})
            }
            ret = ret.concat(res.data.song.list);
            this.suggestList = ret.slice(0);
            console.log(this.suggestList)
          }
        })
      },
      showzhida(item){
        return item.zhida === 'singer' ? 'icon-icon-user' : 'icon-yinyue'
      },
      getSinger(singer){
          if(singer){
            return filterSinger(singer)
          }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/variable';
  .suggest-list{
    width:100%;
    padding:0 10px;
    box-sizing: border-box;
    color:@color-theme-d;
  }
  .suggest-list .suggest-item{
    width:100%;
    display:flex;
    padding:5px 0;
    line-height: 30px;
    border-bottom:1px solid @color-highlight-background;
    .iconfont{
      font-size:20px;
    }
    .song-msg{
      margin-left:10px;
      font-size:12px;
      line-height: 15px;
      .song-name{
          font-size:14px;
        line-height:30px;
      }
      .singer-name{
        color:@color-sub-theme
      }
    }
  }
</style>
