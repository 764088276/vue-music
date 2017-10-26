<template>
  <div class="music-list">
    <header>
      <span class="back" @touchstart="back">返回</span>
      {{name}}
    </header>
    <div class="bg-image" ref="bgImage" :style="bgImg">
      <div class="random_play" ref="random_play">
        随机播放全部
      </div>
      <div class="filter-layer">
      </div>
    </div>
    <scroll :data="songs" :listenScroll=true class="scroll-wrapper" ref="scrollWrapper" @scroll="scroll">
      <ul class="song-list">
        <li v-for="(song,index) in songs" @click="selectSong(songs,index)">
          <span class="text">{{song.name}}</span>
          <span class="singer">{{getSingerName(song)}}</span>
        </li>
      </ul>
      <!--加载的进度条-->
      <div class="loading-container" v-if="!songs.length">
        <loading></loading>
      </div>
    </scroll>

  </div>
</template>

<script type="text/javascript">
  import scroll from 'base/scroll/scroll'
  import loading from 'base/loading/loading'
  import cssProfix from'assets/js/dom'
  import {mapActions} from 'vuex'

  const LAYER_HEIGHT = 40;
  export default{
    props: {
      name: {
        type: String,
        default: ""
      },
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      }
    },
    data(){
      return {
        bgImageHeight: ''
      }
    },
    mounted(){

      this.imageHeight = this.$refs.bgImage.clientHeight;
      this.$refs.scrollWrapper.$el.style.top = `${ this.imageHeight}px`;

    },
    computed: {
      bgImg(){
        return `background-image:url(${this.bgImage})`
      }
    },
    methods: {
      back(){
        this.$router.back()
      },
      getSingerName(song){
        return `${song.singer}-${song.album}`
      },
      scroll(pos){
        let y = pos.y;
        //下拉缩放比例
        let scale = 1 + Math.abs(y) / this.imageHeight;
        //上拖
        let minHeight = -1 * ( this.imageHeight - LAYER_HEIGHT);
        if (y > 0) {
          this.$refs.bgImage.style[cssProfix('transform')] = `scale(${scale})`
        } else if (y < minHeight) {
          this.$refs.bgImage.style['zIndex'] = 10;
          this.$refs.bgImage.style.paddingTop = LAYER_HEIGHT + 'px';
          this.$refs.random_play.style.display = 'none';

        } else {
          this.$refs.bgImage.style.paddingTop = '70%';
          this.$refs.bgImage.style.zIndex = '';
          this.$refs.random_play.style.display = 'block';
        }
      },
      ...mapActions([
          'playSong'
      ]),
      selectSong(songs, index){
        this.playSong({
          list: songs,
          index: index
        })
      }
    },
    components: {
      scroll,
      loading
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/variable.less';

  .music-list {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: @color-background;
  }

  header {
    width: 100%;
    line-height: 40px;
    text-align: center;
    position: absolute;
    font-size: 16px;
    color: @color-theme;
    z-index: 1000;
    span {
      padding: 0 5px;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .bg-image {
    width: 100%;
    height: 0;
    padding-top: 70%;
    background-size: 100% auto;
    position: absolute;
    overflow: hidden;
    .random_play {
      line-height: 30px;
      padding: 0 10px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      border: 1px solid @color-theme;
      font-size: 12px;
      bottom: 20px;
      border-radius: 15px;
      letter-spacing: 1px;
      color: @color-theme;
    }
  }

  .scroll-wrapper {
    position: absolute;
    left: 0;
    bottom:60px;
    right: 0;
    /*overflow: hidden;*/
  }

  .song-list {
    background: @color-background;

    li {
      line-height: 20px;
      padding: 2px 15px;
      span {
        display: block;
        margin: 5px 0;
        &.text {
          color: @color-theme;
        }
        &.singer {
          color: @color-theme-d;
          font-size: @font-size-small
        }
      }
    }
  }

  .loading-container {
    width: 100%;
    position: absolute;
    top: 30%;
    transform: translateY(-50%);
  }
</style>
