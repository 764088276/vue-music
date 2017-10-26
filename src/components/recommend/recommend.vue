<template>
  <div id="recommend">
    <scroll :data="diskList" class="recommend-content" ref="scroll">
      <div>
        <div class="slide-part" v-if="slidePic.length">
          <slide>
            <div v-for="item in slidePic">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" alt="轮播图" @load="imgLoad">
              </a>
            </div>
          </slide>
        </div>
        <h2 class="recom-title">热门推荐</h2>
        <ul class="new-disk-list" v-if="this.diskList">
          <li v-for="item in diskList" @click="selectDisc(item)">
            <img v-lazy="item.cover" alt="宣传图" class="avatar">
            <div class="desc">
              <p v-text="item.title"></p>
              <span>播放量：{{listenNum(item.listen_num)}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="loading" v-if="!diskList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
  import {getRecommend, getDiskList} from '../../api/recommend';
  import {ERR_OK} from '../../api/config.js';
  import slide from '../../base/slide/slide';
  import scroll from 'base/scroll/scroll';
  import loading from 'base/loading/loading';
  import  {mapMutations} from 'vuex'

  export default{
    data(){
      return {
        slidePic: [],
        diskList: [],
        hasLoad: false,
        listenNum(num){
          let transNum = parseInt(num) / 10000;
          if (transNum < 1) {
            return num
          } else {
            return +transNum.toFixed(1) + "万"
          }
        }
      }
    },
    created(){
      this.getData();
      this._getDiskList();
    },
    methods: {
      getData(){
        getRecommend().then((res) => {
          if(res.code === ERR_OK){
          this.slidePic = res.data.slider;
        }
      })
      },
      _getDiskList(){
        getDiskList().then((res) => {
          if (res.code === ERR_OK){
          this.diskList = res.recomPlaylist.data.v_hot;
        }
      })
      },
      imgLoad(){
        //用于防止轮播图未撑开造成的better-scroll渲染不成功
        if (!this.hasLoad) {
          setTimeout(() => {
            this.$refs.scroll.refresh();
        },20);
          this.hasLoad = true;
        }
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      }),
      selectDisc(disc){
          this.$router.push({
              path:`recommend/${disc.content_id}`
          });
        this.setDisc(disc);
        console.log(this.$store.state.disc)
      }
    },
    components: {
      slide,
      scroll,
      loading
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/variable.less';

  #recommend {
    position: fixed;
    top: 88px;
    bottom: 60px;
    width: 100%;
  }

  .recommend-content {
    position: relative;
    height: 100%;
    overflow: hidden;
    width: 100%;
  }

  .recom-title {
    width: 100%;
    text-align: center;
    color: @color-theme;
    line-height: 40px;
  }

  .new-disk-list {
    padding: 0 10px;
    width: 100%;
    box-sizing: border-box;
    li {
      width: 100%;
      height: 100px;
      padding: 10px 0;
      box-sizing: border-box;
      display: flex;
      & > img {
        height: 100%;
        margin-right: 15px;
      }
      & > .desc {
        height: 100%;
        width: 100%;
        color: @color-text;
        font-size: @font-size-medium;
        display: flex;
        justify-content: center;
        flex-direction: column;
        p {
          width: 100%;
          display: block;
          margin-bottom: 20px;
        }
        span {
          display: block;
        }
      }
    }
  }

  .loading {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
