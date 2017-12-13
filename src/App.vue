<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import mHeader from './components/header/header.vue'
  import tab from "./components/tab/tab.vue"
  import player from 'components/player/player.vue'

  export default {
    name: 'app',
    components: {
      mHeader,
      tab,
      player
    }
  }
</script>

<style lang="less" rel="stylesheet/less" type="text/less">
  @import './assets/less/index.less';

  #app {
    background: @color-background;
    font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback';
  }
</style>
