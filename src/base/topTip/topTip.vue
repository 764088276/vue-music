<template>
  <transition name="slide">
    <div class="top-tip" v-show="showMark">
      <i class="iconfont icon-gou"></i>
      <span class="text">{{text}}</span>
    </div>
  </transition>

</template>

<script type="text/javascript">
  export default{
    props: {
      text: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
        showMark:false
      }
    },
    methods: {
      showTopTip(){
        this.showMark = true;
//        setTimeout(()=>{
//          this.hideTopTip()
//        },1000)
      },
      hideTopTip(){
        this.showMark = false
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/variable';

  .slide-enter-active,.slide-leave-active{
    transition:all 0.3s;
    transform:translate3d(0,0,0);
  }
  .slide-enter,.slide-leave-to{
    transform:translate3d(0,-100%,0);
  }
  .top-tip{
    width:100%;
    position:absolute;
    top:0;
    left:0;
    height: 40px;
    background: @color-highlight-background;
    line-height:40px;
    z-index:1000;
    text-align: center;
    i{
      color:@color-theme
    }
    span{
      color:@color-theme;
    }
  }
</style>
