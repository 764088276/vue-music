<template>
  <div class="slider-wrapper" ref="bsWrapper">
    <div class="slide-content" ref="bsContent">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(dot,index) in dots" :class="{active:slideCurrentPage===index}"></span>
    </div>
  </div>
</template>

<script type="text/javascript">
  import BScroll from 'better-scroll';
  import {addClass} from '../../assets/js/addClass.js'
  export default{
    data(){
      return {
        dots: [],
        slideCurrentPage: 0
      }
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    mounted(){
      setTimeout(() => {
        this.setWidth();
        this.dotsInit();
        this.slideInit();
      }, 20);
      if(this.autoPlay){
        setTimeout(() => {
          this._autoPlay();
      }, this.interval);
      }
    },
    methods: {
      /*获取屏幕宽度*/
      setWidth(isResize){
        this.children = this.$refs.bsContent.children;
        let screenWidth = this.$refs.bsWrapper.clientWidth;
        let width = 0;
        for (let i = 0; i < this.children.length; i++) {
          this.children[i].style.width = screenWidth + "px";
          addClass(this.children[i], 'slide-item');
          width += screenWidth;
        }
        if (this.loop && !isResize) {
          width += 2 * screenWidth;
        }
        this.$refs.bsContent.style.width = width + "px";
      },

//   初始化BScroll事件
      slideInit(){
        this.slider = new BScroll(this.$refs.bsWrapper, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          },
          click: true
        });
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX;
          if (this.loop) {
            pageIndex--;
          }
          this.slideCurrentPage = pageIndex;
          if (this.autoPlay) {
            clearTimeout(this.timer);
            this.timer = setTimeout(this._autoPlay, this.interval);
          }
        });
        window.addEventListener('resize', () => {
          this.setWidth(true);
          this.slider.refresh();
        })
      },

      //初始化小圆点
      dotsInit(){
        this.dots = new Array(this.children.length);
      },

//      自动轮播的实现
      _autoPlay(){
        let pageIndex = this.slider.getCurrentPage().pageX;

        pageIndex += 1;
        if(pageIndex>0){
          this.slider.goToPage(pageIndex, 0, 400);
        }
//        this.timer = setTimeout(this._autoPlay, this.interval);
      }
    },
    destoryed(){
      clearTimeout(this.timer);
    }

  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .slider-wrapper {
    position: relative;
    .slide-content {
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      .slide-item {
        float: left;
        overflow: hidden;
        box-sizing: border-box;
        text-align: center;
        a {
          width: 100%;
          height: 100%;
          display: block;
          text-decoration: none;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }

      }
    }
    .dots {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 5px;
      span {
        width: 8px;
        height: 8px;
        background: #f0f0f0;
        display: inline-block;
        margin: 0 5px;
        border-radius: 4px;
        &.active {
          color: #666;
          width: 20px;
        }
      }
    }
  }

</style>
