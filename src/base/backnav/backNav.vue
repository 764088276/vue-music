<template>
    <div class="back-nav">
        <span class="back" @click="goBack()">返回</span>
        <slot></slot>
    </div>
</template>

<script type="text/javascript">
    export default{
        methods:{
          goBack(){
            this.$router.back();
          }}
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/variable.less';

  .back-nav{
    width:100%;
    height:44px;
    background:@color-background-d;
    position:fixed;
    z-index:10;
    text-align: center;
    line-height:44px;
    color:@color-theme;
    .back{
      left:0;
      top:0;
      position:absolute;
      height:100%;
      padding:0 5px;
      color:@color-theme;
      font-size:@font-size-large;
      line-height:44px;
    }
  }
</style>
