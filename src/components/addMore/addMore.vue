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
          <scroll class="list-detail">
            <ul>
              <li>222</li>
            </ul>
          </scroll>
      </div>
    </div>
  </transition>
</template>

<script type="text/javascript">
  import scroll from 'base/scroll/scroll'

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
    methods: {
      showAddMore(){
        this.showMark = true;
        this.currentListIndex = 0;
      },
      hideAddMore(){
        this.showMark = false
      },
      changeListIndex(index){
        this.currentListIndex = index;
      },
      getQuery(query){
        this.query = query
      }
    },
    components: {
      scroll
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
      background:@color-background-d;
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
      .list-detail{
        position:absolute;
        top:100px;
        bottom:0;
        width:100%;
        overflow: hidden;
        ul{
          padding:0 14px;
          box-sizing:border-box;
          li{
            width:100%;
            line-height:24px;
            color:@color-sub-theme
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
