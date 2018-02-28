<template>
  <transition name="play-list">
    <div class="play-list" v-show="showMark" @click.stop="hideList">
      <div class="play-list-layer" @click.stop>
        <div class="title">
          <span class="text">播放列表</span>
          <span class="clear-list iconfont icon-shanchu" @click="clearList"></span>
        </div>
        <scroll class="list-wrapper" :data="playList" ref="scroll">
          <transition-group tag="ul" name="song-list">
            <li v-for="(song,index) in playList" :key="song.id" class="song-list-item" @click="selectItem(index)">
            <span class="playing-mark">
              <i class="iconfont icon-bofang" v-show="currentIndex==index"></i>
            </span>
              <span class="text" :class="{playingText:currentIndex==index}">{{song.name}}--{{song.singer}}</span>
              <i class="iconfont icon-chuyidong" @click.stop="deleteItem(index)"></i>
            </li>
          </transition-group>
        </scroll>
        <!--<div class="add-more" @click="showAddMore">-->
          <!--添加更多歌曲-->
        <!--</div>-->
        <div class="close-list" @click.stop="hideList">
          关闭
        </div>
      </div>
      <add-more
        :listTitle="listTitle"
        ref="addMore"
        title="添加更多歌曲"
      ></add-more>
      <confirm
        text="确认清空播放列表吗"
        ref="confirm"
        @sure="clearPlayList"
      ></confirm>
    </div>
  </transition>
</template>

<script type="text/javascript">
  import {mapGetters} from 'vuex'
  import scroll from 'base/scroll/scroll'
  import {mapActions} from 'vuex'
  import confirm from 'base/confirm/confirm'
  import addMore from 'components/addMore/addMore'

  export default{
    data(){
      return {
        showMark: false,
        listTitle: ['最近播放', '历史搜索']
      }
    },
    computed: {
      ...mapGetters([
        'playList',
        'currentIndex'
      ])
    },
    methods: {
      ...mapActions([
        'playListSongSet',
        'deleteSong',
        'clearPlayList'
      ]),
      showList(){
        this.showMark = true;
        //延时刷新
        setTimeout(() => {
          this.$refs.scroll.refresh();
          this.scrollToElement(this.currentIndex);
        }, 20);
      },
      hideList(){
        this.showMark = false
      },
      scrollToElement(index){
        let songList = document.getElementsByClassName('song-list-item');
        this.$refs.scroll.scrollToElement(songList[index], 500);
      },
      selectItem(index){
        this.playListSongSet(index);
        this.scrollToElement(index);
      },
      deleteItem(index){
        this.deleteSong(index);
//        this.$refs.scroll.refresh();
      },
      clearList(){
        this.$refs.confirm.showConfirmCt();
      },
      showAddMore(){
        this.$refs.addMore.showAddMore();
      }
    },
    components: {
      scroll,
      confirm,
      addMore
    },
    watch: {
      playList(newVal){
        if (!newVal.length) {
          this.hideList();
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/variable';

  .play-list {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1000;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .play-list-layer {
    width: 100%;
    position: absolute;
    bottom: 0;
    background: @color-background;
    .title {
      width: 100%;
      line-height: 30px;
      padding: 0 10px;
      box-sizing: border-box;
      color: @color-text-d;
      font-size: 14px;
      background: @color-highlight-background;
      .icon-shanchu {
        float: right;
        font-size: 20px;
      }
    }
    .list-wrapper {
      line-height: 34px;
      padding: 0 10px;
      box-sizing: border-box;
      max-height: 240px;
      overflow: hidden;
      font-size: 14px;
      color: @color-dialog-background;
      position: relative;
      ul {
        li {
          width: 100%;
          .text {
            width: 70%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
            vertical-align: middle;
            &.playingText {
              color: @color-theme-d;
            }
          }
          .playing-mark {
            width: 12px;
            height: 100%;
            font-size: 12px;
            display: inline-block;
            color: @color-theme;
            margin-right: 4px;
            vertical-align: middle;
          }
          .icon-chuyidong {
            float: right;
            font-size: 20px;
          }
        }
      }
    }
    .add-more {
      padding: 0 10px;
      line-height: 34px;
      text-align: center;
      color: @color-theme-d;
      font-size: 14px;
      background: @color-highlight-background;
      margin-top: 20px;
    }
    .close-list {
      width: 100%;
      text-align: center;
      background: @color-background-d;
      line-height: 40px;
      font-size: 16px;
      color: @color-text-d
    }
  }

  .play-list-enter-active, .play-list-leave-active {
    transition: all 0.2s;
    opacity: 1;
  }

  .play-list-enter, .play-list-leave-to {
    opacity: 0;
  }

  .song-list-enter-active, .song-list-leave-active {
    transition: all 0.3s;
    transform: scaleY(1);
  }

  .song-list-enter, .song-list-leave-to {
    transform: scaleY(0.0001);

  }
</style>
