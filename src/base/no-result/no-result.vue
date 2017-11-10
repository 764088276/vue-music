<template>
  <div class="no-result">
    <div class="img"></div>
    <span class="text">{{text}}</span>
  </div>
</template>

<script type="text/javascript">
  export default{
    props: {
      text: {
        type: String,
        default: '暂时没有歌曲收录'
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/variable';

  .no-result {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top:30px;
  }
  .img{
    width:50px;
    height:50px;
    background:url('no-result@2x.png') no-repeat;
    background-size:100%
  }
  .text {
    display:block;
    width:100%;
    color:@color-highlight-background;
    text-align: center;
    margin-top:10px;
  }
</style>
