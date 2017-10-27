<template>
  <div id="rank">
    <scroll class="rank-list" :data="rankList">
      <ul>
        <li v-for="item in rankList" @click="selectItem(item)">
          <img :src="item.picUrl" alt="">
          <div class="rank-song">
            <h1 class="rank-title">{{item.topTitle}}</h1>
            <p v-for="(song,index) in item.songList">
              <span>{{index+1}}.</span>
              {{song.songname}}--{{song.singername}}
            </p>
          </div>
        </li>
      </ul>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
  import {getRankList} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import scroll from 'base/scroll/scroll'
  import {mapMutations} from 'vuex'

  export default{
    data(){
      return {
        rankList: []
      }
    },
    created(){
      this._getRankList()
    },
    methods: {
      ...mapMutations({
          'setRankList': 'SET_RANK_LIST'
        }
      ),
      _getRankList(){
        getRankList().then(res => {
          if (res.code === ERR_OK) {
            this.rankList = res.data.topList;
            console.log(this.rankList)
          }
        })
      },
      selectItem(item){
        this.$router.push({
          path: `/rank/${item.id}`
        });
        this.setRankList(item);
      }
    },
    components: {
      scroll
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/variable';

  .rank-list {
    width: 100%;
    position: absolute;
    bottom: 60px;
    top: 88px;
    overflow: hidden;
    padding: 0 5px;
    box-sizing: border-box;
    ul {
      position: absolute;
      top: 0;
      width: 100%;
    }
    li {
      display: flex;
      height: 100px;
      margin: 10px 0;
      padding: 5px 5px;
      background: @color-background-d;
      border-radius: 5px;
      img {
        height: 100%;
        border-radius: 5px;
      }
      .rank-song {
        font-size: 14px;
        padding: 0 10px;
        color: @color-theme-d;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        overflow: hidden;
        .rank-title {
          font-size: 16px;
          color: @color-theme;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          margin: 5px 0;
        }
        p {
          width: 100%;
          display: block;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          margin: 4px 0;
        }
      }
    }
  }
</style>
