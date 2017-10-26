<template>
    <div id="header">
        <span class="icon"></span>
        <span class="text">Chicken Music</span>
    </div>
</template>

<script type="text/javascript">
  export default{

  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/less/variable.less";
  #header{
    height:44px;
    position:relative;
    color:@color-theme;
    line-height:44px;
    text-align: center;
    .icon{
      background:url("default.png") no-repeat;
      width:32px;
      height: 32px;
      vertical-align:top;
      display:inline-block;
      background-size:100%;
    };
    .text{
      height:100%;
      line-height:44px;
      font-size:@font-size-large;
    }
  }
</style>
