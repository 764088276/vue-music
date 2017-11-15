<template>
  <transition name="add-more">
    <div class="add-more-songs" v-show="showMark" @click.stop key="addMore">
      <nav>
        {{title}}
        <span class="close iconfont icon-chuyidong" @click="hideAddMore"></span>
      </nav>
      <div class="list-wrapper">
        <ul class="list-title">
          <li v-for="(item,index) in listTitle" :class="{active:index===currentListIndex}"
              @click="changeListIndex(index)">
            {{item}}
          </li>
        </ul>
        <scroll class="list-detail" :data="playHistory" ref="addMoreScroll" v-if="currentListIndex===0">
          <ul>
            <li v-for="song in playHistory" @click="selectSong(song)">
              <span class="song-name">{{song.name}}</span><br>
              <span class="singer-name">{{song.singer}}</span>
            </li>
          </ul>
        </scroll>
      </div>
      <top-tip text="已添加1首歌到播放列表" ref="topTip"></top-tip>
    </div>
  </transition>
</template>

<script type="text/javascript">
  import scroll from 'base/scroll/scroll'
  import {mapGetters, mapActions} from 'vuex'
  import suggestList from 'base/searchList/searchList'
  import topTip from 'base/topTip/topTip'

  export default{
    props: {
      title: {
        types: String,
        default: ''
      },
      listTitle: {
        types: Array,
        default: []
      }
    },
    data(){
      return {
        showMark: false,
        currentListIndex: 0,
        query: ''
      }
    },
    computed: {
      ...mapGetters([
        'playHistory'
      ])
    },
    methods: {
      ...mapActions([
        'insertSong',
        'addPlaySong'
      ]),
      showAddMore(){
        this.showMark = true;
//        this.currentListIndex = 0;
        setTimeout(() => {
          this.$refs.addMoreScroll.refresh()
        }, 200);
      },
      hideAddMore(){
        this.showMark = false
      },
      changeListIndex(index){
        this.currentListIndex = index;
      },
      getQuery(query){
        this.query = query
      },
      selectSong(song){
        this.insertSong(song);
      }
    },
    watch: {
      playHistory(){
        setTimeout(() => {
          this.$refs.addMoreScroll.refresh()
        }, 200);
      }
    },
    components: {
      scroll,
      suggestList,
      topTip
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/variable';

  .add-more-songs {
    position: fixed;
    top: 0;
    width: 100%;
    bottom: 0;
    z-index: 10000;
    background: @color-background;
    nav {
      height: 40px;
      position: relative;
      text-align: center;
      color: @color-text-d;
      line-height: 40px;
      background: @color-background-d;
      .close {
        height: 100%;
        width: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 30px;
        color: @color-theme-d;
        display: block;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .list-wrapper {
      margin-top: 20px;
      .list-title {
        display: flex;
        justify-content: center;
        font-size: 14px;
        li {
          padding: 5px 10px;
          color: @color-dialog-background;
          border-radius: 8px;
          background: @color-background-d;
          margin: 0 5px;
          &.active {
            color: @color-theme;
            background: @color-dialog-background;
          }
        }
      }
      .list-detail {
        position: absolute;
        top: 100px;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        ul {
          padding: 0 14px;
          box-sizing: border-box;
          li {
            font-size: 14px;
            width: 100%;
            margin-bottom: 10px;
            color: @color-sub-theme;
            span {
              width: 100%;
              line-height: 18px;
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: @color-text-ll;
              &.singer-name {
                font-size: 12px;
                color: @color-text-d;
              }
            }
          }
        }
      }
    }
  }

  /*过渡样式区*/
  .add-more-enter-active, .add-more-leave-active {
    transition: all 0.3s;
    transform: translateX(0)
  }

  .add-more-enter, .add-more-leave-to {
    transform: translateX(100%);
  }
</style>
