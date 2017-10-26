<template>
  <div>
    <scroll :data="data" class="scroll-container" ref="scroll" v-on:scroll="listenScroll" :listenScroll=true>
      <ul class="data-group">
        <li class="data-group-item" v-for="group in data" ref="dataGroupItem">
          <h2>{{group.index}}</h2>
          <ul>
            <li v-for="item in group.singers" class="singer-item" @click="selectItem(item)">
              <img v-lazy="item.avatar" alt="">
              {{item.name}}
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <ul class="right-bar-list" @touchmove="onTouchMove()">
      <li v-for="(group,index) in data" @touchstart="onTouchStart(index)" :class="{active:index==currentSingerLetter}">
        {{leftBarOperation(group.index)}}
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
  import scroll from 'base/scroll/scroll'
  import getBetween from 'assets/js/getBetween'
  import {addClass} from 'assets/js/addClass'
  const LETTER_HEIGHT = 16;
  export default{
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    created(){
    },
    data(){
      return {
        currentSingerLetter: 0,
        leftBarTop: 0,
        touch: {},
        heightArr: [],
        leftBarOperation(item){
          return item.substring(0, 1)
        }
      }
    },
    methods: {
      selectItem(item){
          this.$emit('showSingerDetail',item)
      },
      onTouchStart(index){
        let e = window.event;
        let dataGroupItem = document.getElementsByClassName('data-group-item')[index];
        this.$refs.scroll.scrollToElement(dataGroupItem, 500);

        //异步问题导致的右侧字母active位置不能正常显示的解决方案
        setTimeout(() => {
          this.currentSingerLetter = index;
        }, 501);
        this.touch.y1 = e.touches[0].pageY;
        this.touch.index = index;
      },
      onTouchMove(){
        let e = window.event;
        this.touch.y2 = e.touches[0].pageY;
        let deltaY = (this.touch.y2 - this.touch.y1) / LETTER_HEIGHT | 0;
        this.currentSingerLetter = getBetween(this.touch.index + deltaY, 0, this.data.length - 1);
        this.$refs.scroll.scrollToElement(this.$refs.dataGroupItem[this.currentSingerLetter], 500);
      },
      //监听滚动事件
      listenScroll(res){
        if (!this.heightArr.length) {
          this.$refs.dataGroupItem.forEach((item) => {
            this.heightArr.push(item.offsetTop)
          })
        }
        let posY = Math.abs(res.y);
        for (let i = 0; i < this.heightArr.length; i++) {
          let h1 = this.heightArr[i];
          let h2 = this.heightArr[i + 1];
          if (posY >= h1 && posY < h2 || !h2) {
            this.currentSingerLetter = i;
            return false
          }
        }
      }
    },
    components: {
      scroll
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .scroll-container {
    width: 100%;
    position: fixed;
    left: 0;
    top: 88px;
    bottom: 60px;
    z-index: 10;
    overflow: hidden;
    color: white;
    h2 {
      color: yellow;
      background: red;
    }
  }

  .singer-item {
    line-height: 30px;
    height: 30px;
    margin: 7px 0;
    /*overflow: auto;*/
    img {
      height: 100%;
      float: left;
      border-radius: 50%;
      margin: 0 10px;
    }
  }

  .right-bar-list {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: blue;
    z-index: 100;
    background: #000;
    .active {
      color: yellow;
    }
  }
</style>
