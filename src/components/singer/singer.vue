<template>
  <div id="singer">
    <list-view :data="singerList" class="singer-list-view" @showSingerDetail="getSelector"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
  import {getSingerList} from 'api/singer.js';
  import {ERR_OK} from 'api/config';
  import singer from 'assets/js/singer.js';
  import listView from 'base/listview/listview'
  import {mapMutations} from 'vuex'

  const HOT_NAME = '热门';
  const HOT_SINGER_LEN = 10;
  export default{
    data(){
      return {
        singers: [],
        singerList: []
      }
    },
    created(){
      this.getSingerData();
    },
    methods: {
      ...mapMutations({
          sendSinger:'SET_SINGER'
      }),
      getSelector(item){
        this.$router.push({
          path: `/singer/${item.id}`
        });
        this.sendSinger(item);
      },
      getSingerData(){
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = res.data.list;
            this.sortSinger();
          }
        })
      },
      sortSinger(){
        let singerList = {};
        singerList[HOT_NAME] = [];
        let singerArr = [];
        this.singers.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            singerList[HOT_NAME].push(new singer(item))
          } else {
            if (singerList[item.Findex]) {
              singerList[item.Findex].push(new singer(item))
            } else {
              singerList[item.Findex] = [];
              singerList[item.Findex].push(new singer(item))
            }
          }
        });
        //热门歌手
        let hotList = {
          index: HOT_NAME,
          singers: singerList[HOT_NAME]
        };
        //各个字母对应的歌手
        let letterList = [];
        //数字对应的歌手
        let numList = {
          index: '#',
          singers: (function () {
            let arr = [];
            for (var i in singerList) {
              let num = parseInt(i);
              if (num) {
                arr = arr.concat(singerList[i])
              }
            }
            return arr
          })()
        };
        for (var i in singerList) {
          if (i !== HOT_NAME && !parseInt(i)) {
            letterList.push({
              index: i,
              singers: singerList[i]
            });
          }
        }
        letterList.sort((a, b) => {
          if (a.index > b.index) {
            return 1
          } else {
            return -1
          }
        });
        letterList.unshift(hotList);
        letterList.push(numList);
        this.singerList = letterList;
      }
    },
    components: {
      listView
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .singer-list-view {
    width: 100%;
    bottom: 0;
    position: fixed;
    top: 84px;
  }
</style>
