<template>
    <div class="tab">
      <router-link tag="div" to="/recommend" class="tab-item">
        <span>推荐</span>
      </router-link>
      <router-link tag="div" to="/rank" class="tab-item">
        <span>排行</span>
      </router-link>
      <router-link tag="div" to="/singer" class="tab-item">
        <span>歌手</span>
      </router-link>
      <router-link tag="div" to="/search" class="tab-item">
        <span>搜索</span>
      </router-link>
    </div>
</template>

<script type="text/javascript">
    export default{}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/variable';
  .tab{
    height:44px;
    width:100%;
    display:flex;
    .tab-item{
      text-align: center;
      line-height:44px;
      color:@color-text;
      width:25%;
      &.router-link-active{
        color:@color-text-d;
      span{
        border-bottom:2px solid @color-sub-theme;
        box-sizing:border-box;
      }
      }
      span{
        height:100%;
        display:inline-block;
        }
    }
  }
</style>
