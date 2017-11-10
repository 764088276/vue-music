<template>
  <div class="search-box">
    <div class="search-content">
      <i class="iconfont icon-sousuo"></i>
      <input type="text" placeholder="请输入关键词" v-model="keyword" ref="searchBox">
      <i class="iconfont icon-chuyidong" v-show="keyword" @click="clearInput"></i>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {inputDam} from 'assets/js/dom'

  export default{
    data(){
      return {
        keyword: ''
      }
    },
    created(){
      this.$watch('keyword', inputDam(function (newVal) {
        this.$emit('keyword', newVal)
      }, 400))
    },
    methods: {
      clearInput(){
        this.keyword = '';
      },
      getKeyWord(item){
        this.keyword = item;
      },
      blur(){
        this.$refs.searchBox.blur()
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/variable';

  .search-box {
    width: 100%;
    padding: 10px 0;
    background: @color-background-d;
    display: flex;
    .search-content {
      width: 80%;
      height: 40px;
      margin: 0 auto;
      background: @color-background;
      border-radius: 10px;
      display: flex;
      /*justify-content: space-between;*/
      align-items: center;
      i {
        width: 10%;
        height: 100%;
        min-width: 40px;
        text-align: center;
        font-size: 22px;
        line-height: 40px;
        color: @color-theme-d;
      }
      input {
        background: @color-background;
        border: 0 none;
        width: 80%;
        color: @color-theme-d;
        outline: 0 none;
        font-size: 14px;
      }
    }
  }
</style>
