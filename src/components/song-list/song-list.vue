<template>
    <div>
      <ul class="song-list">
        <li v-for="song in songs">
          <span class="text">{{song.name}}</span>
          <span class="singer">{{getSingerName(song)}}</span>
        </li>
      </ul>
    </div>
</template>

<script type="text/javascript">
    export default{}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .song-list {
    background: @color-background;

    li {
      line-height: 20px;
      padding: 2px 15px;
      span {
        display: block;
        margin: 5px 0;
        &.text {
          color: @color-theme;
        }
        &.singer {
          color: @color-theme-d;
          font-size: @font-size-small
        }
      }
    }
  }
</style>
