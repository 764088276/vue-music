<template>
  <div class="player">
    <transition name="full"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
    >
      <div class="full" v-show="fullScreen"
           @touchstart.prevent="touchBegin"
           @touchmove.prevent="touchSlide"
           @touchend.prevent="touchFinish"
      >
        <img :src="currentSong.image" alt="" class="bg-img">
        <nav>
          <span class="iconfont icon-xiala" @click="getMini"></span>
          <div class="singer">
            <span class="song-name">{{currentSong.name}}</span>
            <span class="singer-name">{{currentSong.singer}}</span>
          </div>
        </nav>
        <div class="cd-wrapper" ref="cdWrapper">
          <img :src="currentSong.image" alt="cd-image" class="song-image" :class="cdRotate">
        </div>
        <scroll class="lyric-wrapper" :data="lyric.lines" v-if="lyric&&lyric.lines.length>0" ref="scroll">
          <div class="lyric-container">
            <p v-for="(line,index) in lyric.lines"
               ref="lyricLine"
               :class="{active:currentLine==index}"
            >{{line.txt}}</p>
          </div>
        </scroll>
        <div class="bottom-dots">
          <span :class="{currentShow:currentShow==='cd'}"></span>
          <span :class="{currentShow:currentShow==='lyric'}" v-show="lyric&&lyric.lines.length>0"></span>
        </div>
        <ul class="play-wrapper">
          <div class="song-progress">
            <span class="start-time">{{startTime}}</span>
            <div class="progress-bar" @touchstart.stop="setCurrentTime" @touchmove.stop="changeProgress"
                 ref="progressBar">
              <span class="progress" ref="fullProgress">
                <i class="progress-btn"></i>
              </span>
            </div>
            <span class="end-time">{{endTime}}</span>
          </div>
          <li class="play-mode iconfont" :class="modeState" @click.self="showMode">
            <transition name="mode">
              <ul class="mode-list" v-show="modePlayShow">
                <li @click="changeMode(0)"><span class="icon-shunxubofang"></span>顺序播放</li>
                <li @click="changeMode(1)"><span class="icon-danquxunhuan"></span>单曲循环</li>
                <li @click="changeMode(2)"><span class="icon-suijibofang"></span>随机播放</li>
              </ul>
            </transition>
          </li>
          <li class="quick-back iconfont icon-kuaijin1" @click="prev"></li>
          <li class="play iconfont" :class="iconPlay" @click="changePlayState"></li>
          <li class="iconfont icon-kuaijin quick-go" @click="next"></li>
          <li class="iconfont icon-liebiao2 list"></li>
        </ul>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini" v-show="!fullScreen" @click="getFull">
        <div class="song-progress" v-show="currentSong.name">
          <span class="start-time">{{startTime}}</span>
          <div class="progress-bar" @touchstart.stop="setCurrentTime" @touchmove.stop="changeProgress">
            <span class="progress" ref="miniProgress"></span>
          </div>
          <span class="end-time">{{endTime}}</span>
        </div>
        <div class="cd-wrapper" :class="cdRotate">
          <img :src="currentSong.image" alt="cd-image" class="song-image" v-show="currentSong.image">
          <img src="../../assets/imgs/default.png" alt="" v-show="!currentSong.image">
        </div>
        <div class="song-detail">
          <span class="song-name" v-show="currentSong.name">{{currentSong.name}}</span>
          <span class="singer-name" v-show="currentSong.singer">{{currentSong.singer}}</span>
          <span class="default-singer-name" v-show="!currentSong.name">Chicken Music</span>
        </div>
        <div class="play-operation" v-show="currentSong.name">
          <span class="play iconfont" :class="iconPlay" @click.stop="changePlayState"></span>
          <span class="iconfont icon-kuaijin quick-go" @click.stop="next"></span>
          <span class="iconfont icon-liebiao2 list"></span>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="audio" @canplay="ready" @error="error" @timeupdate="timeUpDate"
           @ended="ended"
    ></audio>
  </div>
</template>

<script type="text/javascript">
  import {mapGetters, mapMutations} from 'vuex'
  import animations from 'create-keyframe-animation'
  import play_mode from 'assets/js/config'
  import {getSongLyric} from 'api/song'
  import Lyric from 'lyric-parser'
  import scroll from 'base/scroll/scroll'
  import cssPrefix from 'assets/js/dom'

  const transform = cssPrefix('transform');
  const transition = cssPrefix('transition');
  const PROGRESS_LEN = window.innerWidth * 0.7;
  const PROGRESS_LEFT = 48;
  export default{
    data(){
      return {
        songReady: false,
        currentTime: 0,
        progressPos: 0,
        modePlayShow: false,
        lyric: null,
        currentLine: 0,
        currentShow: 'cd',
        touch: {}
      }
    },
    computed: {
      ...mapGetters([
        'playList',
        'playing',
        'currentSong',
        'fullScreen',
        'currentIndex',
        'mode'
      ]),
      //如果把跟mapGetters相关的数据放在data中会绑定不到data中
      iconPlay(){
        return this.playing ? 'icon-zanting' : 'icon-bofang'
      },
      cdRotate(){
        return this.playing ? 'rotate' : 'rotate rotate-pause'
      },
      modeState(){
        if (this.mode == 0) {
          return 'icon-shunxubofang'
        } else if (this.mode == 1) {
          return 'icon-danquxunhuan'
        } else {
          return 'icon-suijibofang'
        }
      },
      startTime(){
        let intPart = parseInt(this.currentTime / 60);
        let floatPart = this.currentTime % 60;
        if (floatPart < 10) {
          floatPart = "0" + floatPart;
        }
        return intPart + ':' + floatPart
      },
      endTime(){
        let intPart = parseInt(this.currentSong.interval / 60);
        let floatPart = this.currentSong.interval % 60;
        if (floatPart < 10) {
          floatPart = "0" + floatPart;
        }
        return intPart + ':' + floatPart
      }
    },
    methods: {
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlaying: 'SET_PLAYING',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayingMode: 'SET_MODE'
      }),
      getMini(){
        this.setFullScreen(false)
      },
      getFull(){
        if (this.currentSong.image) {
          this.setFullScreen(true);
        }
      },
      getPosAngel(){
        const paddingTop = 100;
        const paddingLeft = 30;
        const paddingBottom = 30;
        const miniWidth = 40;
        const fullWidth = window.innerWidth - 40;
        const scale = miniWidth / fullWidth;
        const x = -(window.innerWidth / 2 - paddingLeft);
        const y = window.innerHeight - paddingBottom - paddingTop - fullWidth / 2;
        return {
          x, y, scale
        }
      },
      enter(el, done){
        const {x, y, scale}=this.getPosAngel();

        let animation = {
          0: {
            transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
          },
          80: {
            transform: `translate3d(0,0,0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0,0,0) scale(1)`
          }
        };
        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 500
          }
        });
        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
      },
      afterEnter(el){
        animations.unregisterAnimation('move');
        this.$refs.cdWrapper.style.animation = ''
      },
      leave(el, done){
        let {x, y, scale}=this.getPosAngel();
        this.$refs.cdWrapper.style.transition = 'all 0.5s';
        this.$refs.cdWrapper.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`;
        this.$refs.cdWrapper.addEventListener('transitionend', done);
      },
      afterLeave(el){
        this.$refs.cdWrapper.style.transition = '';
        this.$refs.cdWrapper.style.transform = 'translate3d(0,0,0)'
      },
      changePlayState(){
        this.setPlaying(!this.playing);
        if (this.lyric) {
          this.lyric.togglePlay();
        }
        if (this.playing) {
          setTimeout(() => {
            this.$refs.audio.play();
          }, 20)
        } else {
          setTimeout(() => {
            this.$refs.audio.pause();
          }, 20)
        }
      },
      next(){
        if (!this.songReady) {
          return false
        }
        let index;
        //不同播放模式下的播放
        if (this.mode == 0) {
          index = this.currentIndex + 1;
          if (index >= this.playList.length) {
            index = 0;
          }
        } else if (this.mode == 1) {
          index = this.currentIndex;
          this.$refs.audio.currentTime = 0;

        } else {
          index = Math.floor(Math.random() * this.playList.length)
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.changePlayState()
        }
        this.songReady = false;
      },
      prev(){
        if (!this.songReady) {
          return false
        }
        let index;
        //不同播放模式下的播放
        if (this.mode == 0) {
          index = this.currentIndex - 1;
          if (index <= -1) {
            index = this.playList.length - 1;
          }
        } else if (this.mode == 1) {
          index = this.currentIndex;
          this.$refs.audio.currentTime = 0;
        } else {
          index = Math.floor(Math.random() * this.playList.length)
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.changePlayState()
        }
        this.songReady = false;
      },
      ready(){
        this.songReady = true;
      },
      timeUpDate(){
        this.currentTime = parseInt(this.$refs.audio.currentTime);
      },
      error(){
        setTimeout(() => {
          alert('对不起，该歌曲暂未收录');
          this.songReady = true;
          this.next()
        }, 600)
      },
      ended(){
        this.songReady = true;
        this.next();
      },
      setCurrentTime(){
        let e = window.event;
        let offsetX = e.touches[0].pageX - PROGRESS_LEFT;
        if (offsetX > PROGRESS_LEN) {
          return false;
        }
        this.currentTime = parseInt(offsetX / PROGRESS_LEN * this.currentSong.interval);
        if (this.lyric) {
          this.lyric.seek(this.currentTime * 1000);
        }
        this.$refs.audio.currentTime = this.currentTime;
      },
      changeProgress(){
        this.setCurrentTime()
      },
      showMode(){
        this.modePlayShow = !this.modePlayShow;
      },
      changeMode(index){
        this.setPlayingMode(index);
        this.modePlayShow = false;
      },
      getLyricData(){
        this.currentSong.getLyric().then(res => {

          this.lyric = new Lyric(res, this.lyricHandler);
          if (this.playing) {
            this.lyric.play()
          }
        })
      },
      lyricHandler({lineNum, txt}){
        this.currentLine = lineNum;
        let lyricLine = this.$refs.lyricLine;
        if (lineNum >= 5) {
          this.$refs.scroll.scrollToElement(lyricLine[lineNum - 5], 1000)
        } else {
          this.$refs.scroll.scrollTo(0, 0, 1000)
        }
      },
//      cd和歌词的切换
      touchBegin(){
        if (!this.lyric.lines.length&&this.lyric) {
          return
        }
        let e = window.event;
        const touch = e.touches[0];
        this.touch.startX = touch.pageX;
        this.touch.startY = touch.pageY;
      },
      touchSlide(){
        if (!this.lyric.lines.length&&this.lyric) {
          return
        }
        let e = window.event;
        let touch = e.touches[0];
        this.touch.moveX = touch.pageX;
        this.touch.moveY = touch.pageY;
        let deltaX = this.touch.moveX - this.touch.startX;
        let deltaY = this.touch.moveY - this.touch.startY;
        let left = this.currentShow === 'cd' ? window.innerWidth : 0;
        let cdOpacity = this.currentShow === 'cd' ? 1 : 0;
        let lyricPos = Math.max(0, Math.min(left + deltaX, window.innerWidth));
        this.touch.percent = deltaX / window.innerWidth;
        this.$refs.scroll.$el.style[transform] = `translate3d(${lyricPos}px,0,0)`;
        this.$refs.cdWrapper.style.opacity = cdOpacity + this.touch.percent;
        this.$refs.scroll.$el.style[transition] = '';
        this.$refs.cdWrapper.style[transition] = '';
      },
      touchFinish(){
        let pos;
        let opacity;
        if (!this.touch.percent) {
          return
        }
        if (this.currentShow === 'cd') {
          if (this.touch.percent < -0.1) {
            pos = 0;
            opacity = 0;
            this.currentShow = 'lyric'
          } else {
            opacity = 1;
            pos = window.innerWidth;
          }
        } else {
          if (this.touch.percent > 0.1) {
            pos = window.innerWidth;
            opacity = 1;
            this.currentShow = 'cd';
          } else {
            pos = 0;
            opacity = 0;
          }
        }
        this.touch.percent = '';
        this.$refs.scroll.$el.style[transform] = `translate3d(${pos}px,0,0)`;
        this.$refs.cdWrapper.style[transition] = `all 0.5s`;
        this.$refs.cdWrapper.style.opacity = opacity;
        this.$refs.scroll.$el.style[transition] = `all 0.5s`;
      }
    },
    watch: {
      currentSong(newVal, oldVal){
//        if (newVal === oldVal) {
//          return
//        }
        if (this.lyric) {
          this.lyric.stop();
        }
        this.$nextTick(() => {
          this.$refs.audio.play();
          this.getLyricData();
        })
      },
      currentTime(newVal){
        let scale = newVal / this.currentSong.interval;
        this.$refs.fullProgress.style.width = scale * 100 + '%';
        this.$refs.miniProgress.style.width = scale * 100 + '%';
      }
    },
    components: {
      scroll
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/variable';

  .player {

    .full {
      width: 100%;
      position: fixed;
      height: 100%;
      bottom: 0;
      top: 0;
      background: rgba(0, 0, 0, 1);
      transition: all 0.5s;
      z-index: 100;
      .bg-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /*z-index:-1;*/
        filter: blur(20px);
        display: block;
      }
      nav {
        width: 100%;
        height: 60px;
        position: absolute;
        .singer {
          width: 100%;
          line-height: 30px;
          text-align: center;
          color: @color-theme-d;
          font-size: @font-size-large;
          .singer-name {
            font-size: @font-size-small;
          }
          span {
            display: inline-block;
            white-space:nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width:70%;
          }
        }
        .icon-xiala {
          width: 30px;
          font-size: @font-size-small;
          height: 30px;
          position: absolute;
          top: 0;
          left: 0;
          color: @color-theme;
          text-align: center;
          line-height: 30px;
        }
      }
      .cd-wrapper {
        left: 20px;
        right: 20px;
        position: absolute;
        top: 100px;
        padding: 7px;
        box-sizing: border-box;
        background: #333;
        border-radius: 50%;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .play-wrapper {
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 0;
        color: @color-theme;
        justify-content: space-between;
        > li {
          font-size: 24px;
          margin: 0 14px;
          &.play {
            font-size: 32px;
          }
          &.play-mode {
            position: relative;
            > ul {
              position: absolute;
              font-size: 14px;
              transform: translate(0, -180%);
              width: 90px;
              background: @color-highlight-background;
              padding: 5px 10px;
              border-radius: 10px;
              > li {
                width: 100%;
                line-height: 24px;
                > span {
                  font-size: 16px;
                  float: left;
                  margin-right: 12px;
                }
              }
            }
          }
        }
      }
    }
    .full-enter-active, .full-leave-active {
      opacity: 1;
      nav {
        transform: translate3d(0, 0, 0);
        transition: all 0.5s;
      }
      .play-wrapper {
        transform: translate3d(0, 0, 0);
        transition: all 0.5s;

      }
    }
    .full-enter, .full-leave-to {
      opacity: 0;
      nav {
        transform: translate3d(0, -100%, 0);
      }
      .play-wrapper {
        transform: translate3d(0, 100%, 0);
      }
    }
    .mini-enter-active, .mini-leave-active {
      opacity: 1;
    }
    .mini-enter, .mini-leave-to {
      opacity: 0;
    }
    .mode-enter-active, .mode-leave-active {
      opacity: 1;
      transition: all 0.5s;
    }
    .mode-enter, .mode-leave-to {
      opacity: 0;
    }
    .mini {
      position: absolute;
      width: 100%;
      height: 60px;
      bottom: 0;
      background: @color-highlight-background;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      transition: all 0.5s;
      z-index: 10;
      .cd-wrapper {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        padding: 2px;
        box-sizing: border-box;
        margin: 0 10px;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .song-detail {
        font-size: @font-size-medium;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 40%;
        span {
          display: block;
          color: @color-theme;
          line-height: 18px;
          &.singer-name {
            font-size: 12px;
            color: @color-theme-d;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
      .play-operation {
        color: @color-theme-d;
        vertical-align: middle;
        margin-left: 20px;
        position: absolute;
        right: 5px;
        span {
          font-size: 20px;
          display: inline-block;
          margin: 0 6px;
        }
      }
    }
  }

  /*播放时唱片旋转特效*/
  .rotate {
    animation: rotate 20s linear infinite
  }

  .rotate-pause {
    animation-play-state: paused;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg)
    }
  }

  //歌曲播放进度条
  .song-progress {
    width: 100%;
    position: absolute;
    top: 0;
    display: flex;
    /*height:2px;*/
    justify-content: center;
    align-items: center;
    color: @color-theme;
    .start-time, .end-time {
      font-size: @font-size-small;
      display: block;
      width: 15%;
      text-align: center;
    }
    .progress-bar {
      width: 70%;
      height: 2px;
      background: grey;
      .progress {
        width: 0;
        display: block;
        position: relative;
        background: #fff;
        height: 100%;

        .progress-btn {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          display: block;
          right: 0;
          top: 50%;
          transform: translate(50%, -50%);
        }
      }
    }
  }

  /*歌词列表*/
  .lyric-wrapper {
    position: absolute;
    top: 70px;
    bottom: 100px;
    overflow: hidden;
    text-align: center;
    font-size: 15px;
    left: 0;
    right: 0;
    color: @color-dialog-background;
    line-height: 24px;
    transform: translate3d(100%, 0, 0);
    .lyric-container {
      width: 100%;
      position: absolute;
      padding: 0 30px;
      box-sizing: border-box;
      p.active {
        color: white;
        font-size: 16px;
      }
    }
  }

  .bottom-dots {
    position: absolute;
    bottom: 90px;
    display: flex;
    justify-content: center;
    z-index: 1000;
    width: 100%;
    span {
      width: 8px;
      height: 8px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 4px;
      margin: 0 3px;
      transition: all 0.5s;
      &.currentShow {
        width: 16px;
        background: #fff;
      }
    }
  }
</style>
