<template>
  <div v-if="query">
    <scroll class="suggest-list" :data="suggestList" ref="scroll" :pullup="true" @scrollEnd="scrollEnd">
      <ul>
        <li v-for="(item,index) in suggestList" class="suggest-item" @click="selectItem(item,index)">
          <i class="iconfont" :class="showzhida(item)"></i>
          <div class="song-msg">
            <span class="song-name" v-html="item.songname"></span>
            <span class="song-name" v-html="item.singername"></span><br>
            <span class="singer-name" v-html="getSinger(item.singer)"></span>
          </div>
        </li>
        <div class="loading-wrapper" v-show="loadFinished">
          <loading text=""></loading>
        </div>
      </ul>
    </scroll>
    <div class="no-result" v-show="!suggestList.length&&query&&!loadFinished">
      <no-result></no-result>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
  import {getSuggestData} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {filterSinger} from 'assets/js/song'
  import scroll from 'base/scroll/scroll'
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import {createSong} from 'assets/js/song'
  import loading from 'base/loading/loading'
  import noResult from 'base/no-result/no-result'

  const PERPAGE=30;
  export default{
    props: {
      query: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
        suggestList: [],
        loadPage: this.page,
        zhida: 1,
        loadFinished: true,
        page:1
      }
    },
    computed: {
      ...mapGetters([
        'playList',
        'searchHistory'
      ])
    },
    created(){
      this.$watch('query', (newVal) => {
        this.suggestList = [];
        this.zhida = 1;
        this.loadFinished = true;
        this.page=1;
        this._getSuggestData(newVal, this.loadPage, this.zhida,PERPAGE);
      });

    },
    methods: {
      ...mapActions([
        'addPlaySong',
        'addPlayHistory'
      ]),
      ...mapMutations({
        setSinger: 'SET_SINGER',
        setHistory:'SET_SEARCH_HISTORY'
      }),
      _getSuggestData(query, page, zhida,perpage){
        getSuggestData(query, page, zhida,perpage).then(res => {
          if (res.code === ERR_OK) {
            let ret = [];
            let songList = [];
            if (res.data.zhida.type !== 0) {
              let mid = res.data.zhida.singermid || res.data.zhida.albummid;
              let name = res.data.zhida.singername || res.data.zhida.albumname;
              let id = res.data.zhida.singerid || res.data.zhida.albumid;
              let avatar;
              if (res.data.zhida.albumname) {
                avatar = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${mid}.jpg?max_age=2592000`;
              } else {
                avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${mid}.jpg?max_age=2592000`;
              }
              ret.push({...res.data.zhida, name, zhida: 'singer', id, mid, avatar})
            }
            ret = ret.concat(res.data.song.list);
            this.suggestList = this.suggestList.concat(ret);
            this.zhida = 0;
            if (this.suggestList.length >= res.data.song.totalnum) {
              this.loadFinished = false;
            }
          }
        })
      },
      showzhida(item){
        return item.zhida === 'singer' ? 'icon-icon-user' : 'icon-yinyue'
      },
      getSinger(singer){
        if (singer) {
          return filterSinger(singer)
        }
      },
      scrollEnd(){
        if (this.loadFinished) {
          this.loadPage++;
          this._getSuggestData(this.query, this.loadPage);
        }
      },
      selectItem(item, index){
        if (item.zhida === 'singer') {
          this.setSinger(item);
          this.$router.push(`/search/${item.id}`);
        } else {
          let song = createSong(item);
          this.addPlaySong(song);
        }
        this.$emit('selected');

      }
    },
    components: {
      scroll,
      loading,
      noResult
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/variable';

  .suggest-list {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    color: @color-theme-d;
    bottom: 60px;
    position: absolute;
    top: 148px;
    overflow: hidden;
  }

  .suggest-list .suggest-item {
    width: 100%;
    display: flex;
    padding: 5px 0;
    line-height: 30px;
    border-bottom: 1px solid @color-highlight-background;
    .iconfont {
      font-size: 20px;
    }
    .song-msg {
      margin-left: 10px;
      font-size: 12px;
      line-height: 15px;
      .song-name {
        font-size: 14px;
        line-height: 30px;
      }
      .singer-name {
        color: @color-sub-theme
      }
    }
  }
</style>
