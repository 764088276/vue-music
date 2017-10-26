<template>
    <div class="loading-component">
      <p>正在加载...</p>
      <img src="./loading.gif" alt="">
    </div>
</template>

<script type="text/javascript">
    export default{}
</script>

<style lang="less" rel="stylesheet/less" scoped>
    .loading-component{
      width: 100%;
      text-align: center;
      p{
        width:100%;
        font-size:12px;
        color:#fff;
      }
      img{
        margin-top:10px;
        width:24px;
        height: 24px;
      }
    }
</style>
